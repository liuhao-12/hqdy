# Cloudflare Worker 快速部署指南

这是一个简单的 Cloudflare Worker 项目，可以快速部署到 Cloudflare。

## 项目地址

GitHub: https://github.com/YOUR_USERNAME/my-hqdy

## 部署步骤

1. 安装必要的工具
   ```bash
   npm install -g wrangler
   ```

2. 登录 Cloudflare
   ```bash
   npx wrangler login
   ```

3. 创建新项目
   ```bash
   npx wrangler init my-worker
   cd my-worker
   ```

4. 复制代码
   - 将 `index.js` 文件内容替换为以下代码：
   ```javascript
   export default {
     async fetch(request, env, ctx) {
       const email = generateRandomEmail();
       const registerUrl = `https://api.xuebifast.com/api/v1/passport/auth/register?email=${email}&password=88888888`;
       const regResp = await fetch(registerUrl, { method: 'POST' });
       const regData = await regResp.json();
       
       if (!regData.data || !regData.data.token) {
         return new Response('注册失败', { status: 500 });
       }
       
       const token = regData.data.token;
       const subUrl = `https://api.xuebifast.com/api/v1/client/subscribe?token=${token}`;
       const subResp = await fetch(subUrl);
       const base64Data = await subResp.text();
       const processedData = decodeBase64(base64Data);
       const redirectUrl = `https://url.v1.mk/sub?target=clash&url=${processedData}&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FWC-Dream%2FACL4SSR%2FWD%2FClash%2Fconfig%2FACL4SSR_Mini_Dream.ini`;
       return Response.redirect(redirectUrl, 302);
     }
   }

   function generateRandomEmail() {
     const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
     const length = Math.floor(Math.random() * 10) + 5;
     let email = '';
     for (let i = 0; i < length; i++) {
       email += chars.charAt(Math.floor(Math.random() * chars.length));
     }
     const domains = [
       'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'qq.com', '163.com', 'foxmail.com'
     ];
     const domain = domains[Math.floor(Math.random() * domains.length)];
     return `${email}@${domain}`;
   }

   function decodeBase64(base64String) {
     try {
       const decodedString = decodeURIComponent(
         atob(base64String).replace(/\r?\n/g, '|')
       );
       return encodeURIComponent(decodedString);
     } catch (e) {
       return 'error';
     }
   }
   ```

5. 修改项目名称
   - 打开 `wrangler.toml` 文件，修改 `name` 字段为你想要的名称：
   ```toml
   name = "你的项目名称"
   main = "index.js"
   compatibility_date = "2024-05-01"
   workers_dev = true
   ```

6. 部署项目
   ```bash
   npx wrangler deploy
   ```

7. 部署完成后，你会得到一个类似这样的 URL：
   ```
   https://你的项目名称.xxxxx.workers.dev
   ```

## 注意事项

1. 确保你已经注册了 Cloudflare 账号
2. 项目名称必须是唯一的
3. 部署后可能需要等待几分钟才能访问
4. 如果遇到问题，可以尝试重新部署

## 常见问题

1. 如果部署失败，检查是否已登录 Cloudflare
2. 如果访问返回错误，检查代码是否正确复制
3. 如果 URL 无法访问，等待几分钟后重试 