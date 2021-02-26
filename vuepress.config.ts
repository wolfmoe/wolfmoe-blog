import * as chokidar from 'chokidar'
import type { UserConfig } from '@vuepress/cli'
import type { DefaultThemeOptions } from '@vuepress/theme-default'
import { chalk, logger } from '@vuepress/utils'
import { navbar, sidebar } from './configs'
import { path } from '@vuepress/utils'

const config: UserConfig<DefaultThemeOptions> = {
  base: '/',
  lang: "zh-TW",
  //theme: path.resolve(__dirname, './theme'),
  dest: "dist",
  temp: ".temp",
  cache: ".cache",
  public: "public",
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
	["link", { rel: "icon", href: `/avatar.jpg` }],
    ['meta', { name: 'application-name', content: 'Wolf.Moe' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'Wolf.Moe' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'white' }],
    ['meta', { name: 'msapplication-TileColor', content: '#66ccff' }],
    ['meta', { name: 'theme-color', content: '#66ccff' }],
  ],
  locales: {
    '/': {
      lang: 'zh-TW',
      title: '萌狼日記',
      description: '你站在書櫃前仔細檢查，發現了一個暗格…',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Wolf.Moe',
      description: 'Moe Wolf\'s Blog',
    },
  },
  themeConfig: {
    logo: '/assets/book.png',
    repo: 'wolfmoe/wolfmoe-blog',
    docsDir: 'src',
    docsBranch: 'main',
    editLinks: false,
    locales: {
      '/': {
        navbar: navbar.zh,
        sidebar: sidebar.zh,
        selectLanguageName: '正體中文',
        selectLanguageText: '語言',
        selectLanguageAriaLabel: '語言',
        editLinkText: 'GitHub上編輯該文章',
        lastUpdatedText: '最後更新',
        contributorsText: '撰稿人',
        tip: '提示',
        warning: '注意',
        danger: '警告',
        notFound: [
          '這篇文章不存在這個節點了',
          '不在這個世界線下'
        ],
        backToHome: '回家',
        openInNewWindow: '自新視窗開啟',
      },
      '/en/': {
        navbar: navbar.en,
        sidebar: sidebar.en,
        editLinkText: 'Edit this page on GitHub',
      },
    },
  },
  plugins: [
/* feature: https://github.com/vuepress/vuepress-next/issues/54
     [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'post',
            dirname: 'posts',
            path: '/posts/',
          }
        ],
        frontmatters: [
          {
            id: "category",
            keys: ['category'],
            path: '/category/',
          }
        ],
        globalPagination: {
          prevText: '現在',
          nextText: '過去',
          lengthPerPage: 5,
        },
        comment: {
          // Which service you'd like to use
          service: 'disqus',
          // The owner's name of repository to store the issues and comments.
          shortname: 'wolfmoe',
        },
        feed: {
          canonical_base: 'https://blog.wolf.moe',
        }
      },
    ], */
    [
      '@vuepress/plugin-google-analytics',
      {
        id: process.env.GA_ID,
      },
    ],
    // feature
    // ['@vuepress/plugin-pwa'],
    // [
    //   '@vuepress/plugin-pwa-popup',
    //   {
    //     locales: {
    //       '/': {
    //         message: '新世界變動了',
    //         buttonText: '前往將來',
    //       },
    //     },
    //   },
    // ],
  ],
  onWatched: (_, watchers, restart) => {
    const watcher = chokidar.watch('configs/**/*.ts', {
      cwd: __dirname,
      ignoreInitial: true,
    })
    watcher.on('change', async (file) => {
      logger.info(`file ${chalk.magenta(file)} is modified`)
      await restart()
    })
    watchers.push(watcher)
  },
}

export = config