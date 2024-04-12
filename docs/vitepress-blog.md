# 使用 vitepress+github 搭建博客
> 本文记录vitepress和github pages搭建博客的过程，期间有尝试手动部署打包后的项目，和使用github actions 自动构建发布的流程
>
> vitepress 是一个SSG(Static site generators，静态站点生成器)，内容使用Markdown语法，配置简单，同时附带了一个默认主题，即使不需要写前端代码，也可以生成一个静态网站。底层使用Vite和Vue3，前端开发者可方便的进行修改或定制。

## 环境搭建
```
1. 安装node
   brew install node

2. 使用pnpm创建vitepress项目
	
    #安装pnpm
	npm install -g pnpm 

	# 初始化node工程
	pnpm init 
	
    # 安装vitepress
	pnpm add -D vitepress
	
    # 初始化vitepress
	pnpm exec vitepress init	

```
#### 注意事项
1. 初始化项目目录填写 docs
2. 主题选择默认或者默认+自定义主题
3. 其他默认即可


初始化完成后，`package.json` 有了几条命令
说明如下
```
# 安装依赖
pnpm install

# 开发模式启动
pnpm docs:dev

# 手动构建
pnpm docs:build

# 预览构建成果
pnpm docs:preview

```

#### 项目结构
```
├─.github           # github配置
│  └─workflows      # 自动构建部署配置
├─bin               # 执行脚本
├─components        # vue组件
├─docs              # 博客内容
│   ├─.vitepress    
│   │  ├─config.ts  # vitepress配置
│   │  ├─cache      # 缓存文件，可忽略提交
│   │  ├─dist       # 构建包，可忽略提交
│   │  └─theme      # 样式和主题
│   ├─index.md      # 博客首页
│   ├─2023          # 按照年份存放博文
│   ├─2022
│   ├─...           # 更多博客目录
│   └─public        # 博客使用的静态资源
├─node_modules      # 依赖目录，可忽略提交
├─.gitignore        # git提交忽略配置
├─package.json      # node.js配置
├─pnpm-lock.yaml    # 依赖的锁定版本号
└─README.md         # 工程说明

```

## 简单使用

### config修改

config文件可以配置主题，导航栏，路由等信息，目录在 `docs/.vitepress/config.mts`

```
简单样式

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/learn-typescript/',
  lang: 'zh-CN',
  title: "vvfan blog 11",
  description: "vvfan blog desc",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '网站动态', link: '/vitepress-blog' }
    ],

    sidebar: [
      {
        text: '文章列表',
        items: [
          { text: '博客搭建', link: '/vitepress-blog' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})


```

### 主题修改

如果主题的样式需要修改，可在样式文件中增加css样式，目录在`docs/.vitepress/theme/style.css`

### 文档编写

以后可以在docs目录下，编写markdown文档


## 手动构建部署

### 创建github仓库

将我们的代码提交到仓库中的`main`分支，由于我们写了`.gitignore`文件，只提交了源代码文件；
构建结果没有上传，下一步我们要构建和部署


### 构建部署

在`bin`目录下，新建`deploy.sh`脚本文件
内容如下
```
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm run docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com-repo-ts:vvfan/learn-typescript.git main:gh-pages

cd -

```

#### 流程
1. 上面的代码仓库要换成自己的仓库
2. 通过脚本部署我们知道，流程为
   > 构建项目，生成dist目录
   >
   > 生成目录上传至 gh-pages 分支
3. package.json 文件中 增加命令
  ```
	"deploy:win": "/bin/bash bin/deploy.sh"
  ```
4. 执行命令，完成构建部署
  ```
	pnpm deploy:win
  ```
5. 发布网站

进入创建的GitHub仓库的配置，在Settings -> Pages -> Build and deployment -> Source
来源选择Deploy from a branch，选择刚刚部署脚本中的 gh-pages 分支
保存后，就可以看效果了

6. 访问验证

`https://<USERNAME>.github.io/<REPO>`

#### 注意事项
在访问的时候，发现页面的样式不对，通过控制台发现css js的文件目录找不到,此时注意修改 项目的根目录配置。

`docs/.vitepress/config.mts` 文件中 的 base配置，配置为 base:'/'。




## github Actions 自动构建和发布

上述的构建流程，每次提交完代码后，需要执行下部署脚本，才可以看到效果；

github actions的功能，帮我们自动构建并发布，每次提交代码后，只需要等待结果即可。

#### 流程

1. GitHub配置

> 位置依旧在Settings -> Pages -> Build and deployment -> Source；
>
> 将之前设置的Deploy from a branch，修改为GitHub Actions。


2. 创建部署文件

`.github/workflows/deploy.yml`

```
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
#
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
        with:
          version: 8.15
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm # 或 npm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: pnpm install # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: pnpm docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4


```

#### 注意事项
>* 配置文件问题
>
>`github/workflows/deploy.yml`，如果用的是 pnpm 记得填写 version；可根据 github action的是错误 ，查询问题
>
>* 样式问题
>
>如果是 actions 的方式， base 需为 项目名称；
>
>如果是 使用手动部署脚本的方式，base 为 根目录。
>
>* 仓库需设置为公共仓库
>
>仓库需设置为公共仓库，才可以使用github actions功能，或者付费的方式。
>
>**如果采用自动部署，gh-pages 分支不会自动更新**



## 参考文档
[使用VitePress和Github搭建个人博客网站，可以自动构建和发布](https://jzplp.github.io/2023/blog-github.html)

[vitepress官网](https://vitepress.dev/zh/guide/getting-started)

