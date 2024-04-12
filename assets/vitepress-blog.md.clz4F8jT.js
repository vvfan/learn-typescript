import{_ as s,c as n,o as a,a3 as p}from"./chunks/framework.B-X9Pj3_.js";const b=JSON.parse('{"title":"使用 vitepress+github 搭建博客","description":"","frontmatter":{},"headers":[],"relativePath":"vitepress-blog.md","filePath":"vitepress-blog.md"}'),e={name:"vitepress-blog.md"},l=p(`<h1 id="使用-vitepress-github-搭建博客" tabindex="-1">使用 vitepress+github 搭建博客 <a class="header-anchor" href="#使用-vitepress-github-搭建博客" aria-label="Permalink to &quot;使用 vitepress+github 搭建博客&quot;">​</a></h1><blockquote><p>本文记录vitepress和github pages搭建博客的过程，期间有尝试手动部署打包后的项目，和使用github actions 自动构建发布的流程</p><p>vitepress 是一个SSG(Static site generators，静态站点生成器)，内容使用Markdown语法，配置简单，同时附带了一个默认主题，即使不需要写前端代码，也可以生成一个静态网站。底层使用Vite和Vue3，前端开发者可方便的进行修改或定制。</p></blockquote><h2 id="环境搭建" tabindex="-1">环境搭建 <a class="header-anchor" href="#环境搭建" aria-label="Permalink to &quot;环境搭建&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 安装node</span></span>
<span class="line"><span>   brew install node</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 使用pnpm创建vitepress项目</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    #安装pnpm</span></span>
<span class="line"><span>	npm install -g pnpm </span></span>
<span class="line"><span></span></span>
<span class="line"><span>	# 初始化node工程</span></span>
<span class="line"><span>	pnpm init </span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    # 安装vitepress</span></span>
<span class="line"><span>	pnpm add -D vitepress</span></span>
<span class="line"><span>	</span></span>
<span class="line"><span>    # 初始化vitepress</span></span>
<span class="line"><span>	pnpm exec vitepress init</span></span></code></pre></div><h4 id="注意事项" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项" aria-label="Permalink to &quot;注意事项&quot;">​</a></h4><ol><li>初始化项目目录填写 docs</li><li>主题选择默认或者默认+自定义主题</li><li>其他默认即可</li></ol><p>初始化完成后，<code>package.json</code> 有了几条命令 说明如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 安装依赖</span></span>
<span class="line"><span>pnpm install</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开发模式启动</span></span>
<span class="line"><span>pnpm docs:dev</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 手动构建</span></span>
<span class="line"><span>pnpm docs:build</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 预览构建成果</span></span>
<span class="line"><span>pnpm docs:preview</span></span></code></pre></div><h4 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>├─.github           # github配置</span></span>
<span class="line"><span>│  └─workflows      # 自动构建部署配置</span></span>
<span class="line"><span>├─bin               # 执行脚本</span></span>
<span class="line"><span>├─components        # vue组件</span></span>
<span class="line"><span>├─docs              # 博客内容</span></span>
<span class="line"><span>│   ├─.vitepress    </span></span>
<span class="line"><span>│   │  ├─config.ts  # vitepress配置</span></span>
<span class="line"><span>│   │  ├─cache      # 缓存文件，可忽略提交</span></span>
<span class="line"><span>│   │  ├─dist       # 构建包，可忽略提交</span></span>
<span class="line"><span>│   │  └─theme      # 样式和主题</span></span>
<span class="line"><span>│   ├─index.md      # 博客首页</span></span>
<span class="line"><span>│   ├─2023          # 按照年份存放博文</span></span>
<span class="line"><span>│   ├─2022</span></span>
<span class="line"><span>│   ├─...           # 更多博客目录</span></span>
<span class="line"><span>│   └─public        # 博客使用的静态资源</span></span>
<span class="line"><span>├─node_modules      # 依赖目录，可忽略提交</span></span>
<span class="line"><span>├─.gitignore        # git提交忽略配置</span></span>
<span class="line"><span>├─package.json      # node.js配置</span></span>
<span class="line"><span>├─pnpm-lock.yaml    # 依赖的锁定版本号</span></span>
<span class="line"><span>└─README.md         # 工程说明</span></span></code></pre></div><h2 id="简单使用" tabindex="-1">简单使用 <a class="header-anchor" href="#简单使用" aria-label="Permalink to &quot;简单使用&quot;">​</a></h2><h3 id="config修改" tabindex="-1">config修改 <a class="header-anchor" href="#config修改" aria-label="Permalink to &quot;config修改&quot;">​</a></h3><p>config文件可以配置主题，导航栏，路由等信息，目录在 <code>docs/.vitepress/config.mts</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>简单样式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import { defineConfig } from &#39;vitepress&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// https://vitepress.dev/reference/site-config</span></span>
<span class="line"><span>export default defineConfig({</span></span>
<span class="line"><span>  base: &#39;/learn-typescript/&#39;,</span></span>
<span class="line"><span>  lang: &#39;zh-CN&#39;,</span></span>
<span class="line"><span>  title: &quot;vvfan blog 11&quot;,</span></span>
<span class="line"><span>  description: &quot;vvfan blog desc&quot;,</span></span>
<span class="line"><span>  themeConfig: {</span></span>
<span class="line"><span>    // https://vitepress.dev/reference/default-theme-config</span></span>
<span class="line"><span>    nav: [</span></span>
<span class="line"><span>      { text: &#39;首页&#39;, link: &#39;/&#39; },</span></span>
<span class="line"><span>      { text: &#39;网站动态&#39;, link: &#39;/vitepress-blog&#39; }</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    sidebar: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;文章列表&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;博客搭建&#39;, link: &#39;/vitepress-blog&#39; }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;Examples&#39;,</span></span>
<span class="line"><span>        items: [</span></span>
<span class="line"><span>          { text: &#39;Markdown Examples&#39;, link: &#39;/markdown-examples&#39; },</span></span>
<span class="line"><span>          { text: &#39;Runtime API Examples&#39;, link: &#39;/api-examples&#39; }</span></span>
<span class="line"><span>        ]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ],</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    socialLinks: [</span></span>
<span class="line"><span>      { icon: &#39;github&#39;, link: &#39;https://github.com/vuejs/vitepress&#39; }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>})</span></span></code></pre></div><h3 id="主题修改" tabindex="-1">主题修改 <a class="header-anchor" href="#主题修改" aria-label="Permalink to &quot;主题修改&quot;">​</a></h3><p>如果主题的样式需要修改，可在样式文件中增加css样式，目录在<code>docs/.vitepress/theme/style.css</code></p><h3 id="文档编写" tabindex="-1">文档编写 <a class="header-anchor" href="#文档编写" aria-label="Permalink to &quot;文档编写&quot;">​</a></h3><p>以后可以在docs目录下，编写markdown文档</p><h2 id="手动构建部署" tabindex="-1">手动构建部署 <a class="header-anchor" href="#手动构建部署" aria-label="Permalink to &quot;手动构建部署&quot;">​</a></h2><h3 id="创建github仓库" tabindex="-1">创建github仓库 <a class="header-anchor" href="#创建github仓库" aria-label="Permalink to &quot;创建github仓库&quot;">​</a></h3><p>将我们的代码提交到仓库中的<code>main</code>分支，由于我们写了<code>.gitignore</code>文件，只提交了源代码文件； 构建结果没有上传，下一步我们要构建和部署</p><h3 id="构建部署" tabindex="-1">构建部署 <a class="header-anchor" href="#构建部署" aria-label="Permalink to &quot;构建部署&quot;">​</a></h3><p>在<code>bin</code>目录下，新建<code>deploy.sh</code>脚本文件 内容如下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>#!/usr/bin/env sh</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 确保脚本抛出遇到的错误</span></span>
<span class="line"><span>set -e</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成静态文件</span></span>
<span class="line"><span>pnpm run docs:build</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 进入生成的文件夹</span></span>
<span class="line"><span>cd docs/.vitepress/dist</span></span>
<span class="line"><span></span></span>
<span class="line"><span>git init</span></span>
<span class="line"><span>git add -A</span></span>
<span class="line"><span>git commit -m &#39;deploy&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果发布到 https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</span></span>
<span class="line"><span>git push -f git@github.com-repo-ts:vvfan/learn-typescript.git main:gh-pages</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cd -</span></span></code></pre></div><h4 id="流程" tabindex="-1">流程 <a class="header-anchor" href="#流程" aria-label="Permalink to &quot;流程&quot;">​</a></h4><ol><li>上面的代码仓库要换成自己的仓库</li><li>通过脚本部署我们知道，流程为 <blockquote><p>构建项目，生成dist目录</p><p>生成目录上传至 gh-pages 分支</p></blockquote></li><li>package.json 文件中 增加命令</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  &quot;deploy:win&quot;: &quot;/bin/bash bin/deploy.sh&quot;</span></span></code></pre></div><ol start="4"><li>执行命令，完成构建部署</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>  pnpm deploy:win</span></span></code></pre></div><ol start="5"><li>发布网站</li></ol><p>进入创建的GitHub仓库的配置，在Settings -&gt; Pages -&gt; Build and deployment -&gt; Source 来源选择Deploy from a branch，选择刚刚部署脚本中的 gh-pages 分支 保存后，就可以看效果了</p><ol start="6"><li>访问验证</li></ol><p><code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;</code></p><h4 id="注意事项-1" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项-1" aria-label="Permalink to &quot;注意事项&quot;">​</a></h4><p>在访问的时候，发现页面的样式不对，通过控制台发现css js的文件目录找不到,此时注意修改 项目的根目录配置。</p><p><code>docs/.vitepress/config.mts</code> 文件中 的 base配置，配置为 base:&#39;/&#39;。</p><h2 id="github-actions-自动构建和发布" tabindex="-1">github Actions 自动构建和发布 <a class="header-anchor" href="#github-actions-自动构建和发布" aria-label="Permalink to &quot;github Actions 自动构建和发布&quot;">​</a></h2><p>上述的构建流程，每次提交完代码后，需要执行下部署脚本，才可以看到效果；</p><p>github actions的功能，帮我们自动构建并发布，每次提交代码后，只需要等待结果即可。</p><h4 id="流程-1" tabindex="-1">流程 <a class="header-anchor" href="#流程-1" aria-label="Permalink to &quot;流程&quot;">​</a></h4><ol><li>GitHub配置</li></ol><blockquote><p>位置依旧在Settings -&gt; Pages -&gt; Build and deployment -&gt; Source；</p><p>将之前设置的Deploy from a branch，修改为GitHub Actions。</p></blockquote><ol start="2"><li>创建部署文件</li></ol><p><code>.github/workflows/deploy.yml</code></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span>name: Deploy VitePress site to Pages</span></span>
<span class="line"><span></span></span>
<span class="line"><span>on:</span></span>
<span class="line"><span>  # 在针对 \`main\` 分支的推送上运行。如果你</span></span>
<span class="line"><span>  # 使用 \`master\` 分支作为默认分支，请将其更改为 \`master\`</span></span>
<span class="line"><span>  push:</span></span>
<span class="line"><span>    branches: [main]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 允许你从 Actions 选项卡手动运行此工作流程</span></span>
<span class="line"><span>  workflow_dispatch:</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages</span></span>
<span class="line"><span>permissions:</span></span>
<span class="line"><span>  contents: read</span></span>
<span class="line"><span>  pages: write</span></span>
<span class="line"><span>  id-token: write</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列</span></span>
<span class="line"><span># 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成</span></span>
<span class="line"><span>concurrency:</span></span>
<span class="line"><span>  group: pages</span></span>
<span class="line"><span>  cancel-in-progress: false</span></span>
<span class="line"><span></span></span>
<span class="line"><span>jobs:</span></span>
<span class="line"><span>  # 构建工作</span></span>
<span class="line"><span>  build:</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - name: Checkout</span></span>
<span class="line"><span>        uses: actions/checkout@v4</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要</span></span>
<span class="line"><span>      - uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          version: 8.15</span></span>
<span class="line"><span>      - name: Setup Node</span></span>
<span class="line"><span>        uses: actions/setup-node@v4</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          node-version: 20</span></span>
<span class="line"><span>          cache: pnpm # 或 npm / yarn</span></span>
<span class="line"><span>      - name: Setup Pages</span></span>
<span class="line"><span>        uses: actions/configure-pages@v4</span></span>
<span class="line"><span>      - name: Install dependencies</span></span>
<span class="line"><span>        run: pnpm install # 或 pnpm install / yarn install / bun install</span></span>
<span class="line"><span>      - name: Build with VitePress</span></span>
<span class="line"><span>        run: pnpm docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build</span></span>
<span class="line"><span>      - name: Upload artifact</span></span>
<span class="line"><span>        uses: actions/upload-pages-artifact@v3</span></span>
<span class="line"><span>        with:</span></span>
<span class="line"><span>          path: docs/.vitepress/dist</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # 部署工作</span></span>
<span class="line"><span>  deploy:</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      name: github-pages</span></span>
<span class="line"><span>      url: \${{ steps.deployment.outputs.page_url }}</span></span>
<span class="line"><span>    needs: build</span></span>
<span class="line"><span>    runs-on: ubuntu-latest</span></span>
<span class="line"><span>    name: Deploy</span></span>
<span class="line"><span>    steps:</span></span>
<span class="line"><span>      - name: Deploy to GitHub Pages</span></span>
<span class="line"><span>        id: deployment</span></span>
<span class="line"><span>        uses: actions/deploy-pages@v4</span></span></code></pre></div><h4 id="注意事项-2" tabindex="-1">注意事项 <a class="header-anchor" href="#注意事项-2" aria-label="Permalink to &quot;注意事项&quot;">​</a></h4><blockquote><ul><li>配置文件问题</li></ul><p><code>github/workflows/deploy.yml</code>，如果用的是 pnpm 记得填写 version；可根据 github action的是错误 ，查询问题</p><ul><li>样式问题</li></ul><p>如果是 actions 的方式， base 需为 项目名称；</p><p>如果是 使用手动部署脚本的方式，base 为 根目录。</p><ul><li>仓库需设置为公共仓库</li></ul><p>仓库需设置为公共仓库，才可以使用github actions功能，或者付费的方式。</p><p>只不过这样 gh-pages 分支，就不会更新了</p></blockquote><h2 id="参考文档" tabindex="-1">参考文档 <a class="header-anchor" href="#参考文档" aria-label="Permalink to &quot;参考文档&quot;">​</a></h2><p><a href="https://jzplp.github.io/2023/blog-github.html" target="_blank" rel="noreferrer">使用VitePress和Github搭建个人博客网站，可以自动构建和发布</a></p><p><a href="https://vitepress.dev/zh/guide/getting-started" target="_blank" rel="noreferrer">vitepress官网</a></p>`,50),i=[l];function t(c,o,r,d,h,u){return a(),n("div",null,i)}const m=s(e,[["render",t]]);export{b as __pageData,m as default};