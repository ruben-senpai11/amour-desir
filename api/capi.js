const PIXEL_ID = '2465772550579051';
const ACCESS_TOKEN = 'EAAbrqT0BjUMBSZAEe12ExSpY2Ue6hrfYdTGU4D2tW1BErvGhv0injhyZAKPw0HQxKPZC0GisAIKNYJmZCoI84oQyL2w8lTKtVJNhpYjeoF3zojG9Ea4VYvyIN19ZAbsZASh59ZCjikI4eqhgtM8CicGAkwsj68mMPeLholYWgk8IKgnD1I3I1ZCdFPbxbZCjUATcWLgZDZD';

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const eventName = body.event_name || 'PageView';
    const eventId = body.event_id || ('server_' + Date.now() + '_' + Math.floor(Math.random() * 100000));
    const eventSourceUrl = body.url || req.headers.referer || 'https://amour-desir.vercel.app/';
    const clientIp = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'] || '';

    // Extract cookies for Meta _fbp and _fbc
    const cookieHeader = req.headers.cookie || '';
    const getCookie = (name) => {
      const match = cookieHeader.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? decodeURIComponent(match[2]) : undefined;
    };

    const fbp = body.fbp || getCookie('_fbp');
    const fbc = body.fbc || getCookie('_fbc');

    const eventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: eventSourceUrl,
      action_source: 'website',
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: userAgent,
        fbp: fbp,
        fbc: fbc
      }
    };

    if (body.value || eventName === 'InitiateCheckout') {
      eventPayload.custom_data = {
        currency: body.currency || 'XOF',
        value: Number(body.value || 999),
        content_name: 'PACK DU DESIR'
      };
    }

    const fbApiUrl = `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

    const fbResponse = await fetch(fbApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: [eventPayload]
      })
    });

    const fbData = await fbResponse.json();

    return res.status(200).json({
      success: true,
      event_id: eventId,
      meta_response: fbData
    });
  } catch (error) {
    console.error('Meta CAPI Error:', error);
    return res.status(500).json({ error: error.message });
  }
};
