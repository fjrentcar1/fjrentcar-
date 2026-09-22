import midtransClient from 'midtrans-client';
export function snapClient(){
  const serverKey=process.env.MIDTRANS_SERVER_KEY;
  if(!serverKey) throw new Error('MIDTRANS_SERVER_KEY belum diatur');
  return new midtransClient.Snap({isProduction:process.env.MIDTRANS_IS_PRODUCTION==='true',serverKey,clientKey:process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY});
}
