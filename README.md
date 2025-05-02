# Cloudflare Worker 快速部署指南

这是一个简单的 Cloudflare Worker 项目，可以快速部署到 Cloudflare。

## 项目地址

GitHub: https://github.com/liuhao-12/hqdy

## 快速开始

直接克隆仓库:
```bash
git clone https://github.com/liuhao-12/hqdy.git
cd hqdy
```

## 部署步骤

1. 安装必要的工具
   ```bash
   npm install -g wrangler
   ```

2. 登录 Cloudflare
   ```bash
   npx wrangler login
   ```

3. 修改项目名称
   - 打开 `wrangler.toml` 文件，修改 `name` 字段为你想要的名称：
   ```toml
   name = "你的项目名称"
   main = "index.js"
   compatibility_date = "2024-05-01"
   workers_dev = true
   ```

4. 部署项目
   ```bash
   npx wrangler deploy
   ```

5. 部署完成后，你会得到一个类似这样的 URL：
   ```
   https://你的项目名称.xxxxx.workers.dev
   ```

## 功能说明

访问部署后的 URL 会自动：
1. 生成随机邮箱
2. 注册账号并获取 token
3. 请求订阅信息
4. 直接跳转到最终的 Clash 配置页面

## 注意事项

1. 确保你已经注册了 Cloudflare 账号
2. 项目名称必须是唯一的
3. 部署后可能需要等待几分钟才能访问
4. 如果遇到问题，可以尝试重新部署

## 常见问题

1. 如果部署失败，检查是否已登录 Cloudflare
2. 如果 URL 无法访问，等待几分钟后重试 