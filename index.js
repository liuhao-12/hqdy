export default {
  async fetch(request, env, ctx) {
    try {
      // 生成随机邮箱
      const email = generateRandomEmail();
      
      // 注册
      const registerUrl = `https://api.xuebifast.com/api/v1/passport/auth/register?email=${email}&password=88888888`;
      const regResp = await fetch(registerUrl, { method: 'POST' });
      const regData = await regResp.json();
      
      if (!regData.data || !regData.data.token) {
        return new Response('注册失败', { status: 500 });
      }
      
      // 获取订阅信息
      const token = regData.data.token;
      const subUrl = `https://api.xuebifast.com/api/v1/client/subscribe?token=${token}`;
      const subResp = await fetch(subUrl);
      const base64Data = await subResp.text();
      
      // 处理并重定向
      const processedData = decodeBase64(base64Data);
      const redirectUrl = `https://url.v1.mk/sub?target=clash&url=${processedData}&insert=false&config=https%3A%2F%2Fraw.githubusercontent.com%2FWC-Dream%2FACL4SSR%2FWD%2FClash%2Fconfig%2FACL4SSR_Mini_Dream.ini`;
      
      return Response.redirect(redirectUrl, 302);
    } catch (error) {
      return new Response(`处理失败: ${error.message}`, { status: 500 });
    }
  }
}

// 生成随机邮箱
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

// 解码Base64
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