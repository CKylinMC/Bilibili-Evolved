import { monkey } from '@/core/ajax'
import { cdnRoots } from '@/core/cdn-types'
import { meta } from '@/core/meta'
import { getGeneralSettings,settings } from '@/core/settings'
import { logError } from '@/core/utils/log'
import { PluginMetadata } from '@/plugins/plugin'
import { getDescriptionHTML } from '@/components/description'
import Fuse from 'fuse.js'
import { DocSourceItem } from 'registry/lib/docs'
import Vue from 'vue'

export const plugin: PluginMetadata = {
  name: 'onlineRegistry.thirdPartyRepos.CKylinMC',
  displayName: '在线仓库 - CKylinMC仓库源',
  setup: ({ addData, addHook }) => {
    const originalOnlineRegistry = (Vue as any).options.components["OnlineRegistry"];
    const thirdPartyRepoFullPath = 'https://raw.githubusercontent.com/CKylinMC/Bilibili-Evolved/v2/doc/features/thirdparty/custom.json';
    const extendedOnlineRegistry = originalOnlineRegistry.extend({
      methods: {
        async fetchFeatures() {
          if (this.loading) {
            return
          }
          try {
            this.loading = true
            const featureListUrl = `${cdnRoots[getGeneralSettings().cdnRoot](meta.compilationInfo.branch)}doc/features/features.json`
            const packListUrl = `${cdnRoots[getGeneralSettings().cdnRoot](meta.compilationInfo.branch)}doc/features/pack/pack.json`
            const featureList = await monkey({
              url: featureListUrl,
              responseType: 'json',
            })
            const packList = await monkey({
              url: packListUrl,
              responseType: 'json',
            })
            const thirdPartyList = await monkey({
              url: thirdPartyRepoFullPath,
              responseType: 'json',
            })
            this.list = [...packList, ...featureList, ...thirdPartyList]
            this.fuse = new Fuse(this.list, {
              keys: ['displayName', 'name', 'description'],
            })
            this.searchKeyword = ''
            this.filteredList = [...this.list]
          } catch (error) {
            logError(error)
          } finally {
            this.loading = false
          }
        },
      },
    })
    type ExtendedDocSourceItem = DocSourceItem & {
      thirdParty?:boolean
      rootPath?:string
    };
    const getFeatureUrl = (item: ExtendedDocSourceItem) => {
      if(Object.keys(item).includes("thirdParty")){
        return `${item.rootPath}${item.fullAbsolutePath}`;
      }else return `${cdnRoots[getGeneralSettings().cdnRoot](meta.compilationInfo.branch, item.owner)}${item.fullAbsolutePath}`
    }
    const isFeatureInstalled = (item: DocSourceItem) => {
      const storageKey = `user${lodash.startCase(item.type)}s`
      return item.name in settings[storageKey]
    }
    type PackItem = { items: DocSourceItem[] }
    const typeMappings = {
      component: {
        icon: 'mdi-cube-scan',
        badge: '组件',
        getUrl: getFeatureUrl,
        isInstalled: isFeatureInstalled,
      },
      plugin: {
        icon: 'mdi-puzzle-outline',
        badge: '插件',
        getUrl: getFeatureUrl,
        isInstalled: isFeatureInstalled,
      },
      style: {
        icon: 'mdi-tune',
        badge: '样式',
        getUrl: getFeatureUrl,
        isInstalled: isFeatureInstalled,
      },
      pack: {
        icon: 'mdi-package-variant-closed',
        badge: '合集包',
        getUrl: (pack: PackItem) => pack.items.map(getFeatureUrl).join('\n'),
        isInstalled: (pack: PackItem) => pack.items.every(isFeatureInstalled),
      },
    }
    Vue.component('OnlineRegistry',extendedOnlineRegistry);
    const originalRegistryItem = (Vue as any).options.components["RegistryItem"];
    const extendedRegistryItem = originalRegistryItem.extend({
      data() {
        return {
          typeMappings,
          ...typeMappings[this.item.type],
          description: getDescriptionHTML(this.item),
          installing: false,
          installed: false,
          virtual: false,
        }
      },
    })
    Vue.component('RegistryItem',extendedRegistryItem);
  },
}
