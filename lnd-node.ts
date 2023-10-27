const {authenticatedLndGrpc} = require('lightning');
const {getWalletInfo, createInvoice, getChainBalance, pay} = require('ln-service');


const cert = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUNKakNDQWN5Z0F3SUJBZ0lRZG5sbHM3SU1mUzhMNzhhZ1dhSnIxekFLQmdncWhrak9QUVFEQWpBeE1SOHcKSFFZRFZRUUtFeFpzYm1RZ1lYVjBiMmRsYm1WeVlYUmxaQ0JqWlhKME1RNHdEQVlEVlFRREV3VmhiR2xqWlRBZQpGdzB5TXpFd01qWXdOREkwTkRKYUZ3MHlOREV5TWpBd05ESTBOREphTURFeEh6QWRCZ05WQkFvVEZteHVaQ0JoCmRYUnZaMlZ1WlhKaGRHVmtJR05sY25ReERqQU1CZ05WQkFNVEJXRnNhV05sTUZrd0V3WUhLb1pJemowQ0FRWUkKS29aSXpqMERBUWNEUWdBRTRUbzNsQjhxYVZ2Y1loUjdCTXpmZFFOWU4zWk5HQ3hRMk1GS09qWEhlR1RRa2w0cwpZTzRIVU93eWNtWGRDRWdSbmpzZVZBQ0RCM2NyaUMrdzZzbVA1cU9CeFRDQndqQU9CZ05WSFE4QkFmOEVCQU1DCkFxUXdFd1lEVlIwbEJBd3dDZ1lJS3dZQkJRVUhBd0V3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEUKRmdRVUorRERUVkowY1grc3NreHR2YWNZMkNjUlNzSXdhd1lEVlIwUkJHUXdZb0lGWVd4cFkyV0NDV3h2WTJGcwphRzl6ZElJRllXeHBZMldDRG5CdmJHRnlMVzR4TFdGc2FXTmxnZ1IxYm1sNGdncDFibWw0Y0dGamEyVjBnZ2RpCmRXWmpiMjV1aHdSL0FBQUJoeEFBQUFBQUFBQUFBQUFBQUFBQUFBQUJod1NzRmdBRk1Bb0dDQ3FHU000OUJBTUMKQTBnQU1FVUNJQS8xTlNaMS9HQVFyL2xxV1pOVUUyWENkZkhkbzBPMWRuUG5qdFpmZy8zdkFpRUFoVXorc1QyWApJdlp3SVdJY2NlUmMyWEtqdllzOVJDN1kzMlY5SVI2K25Jcz0KLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQo=';
const macaroon = 'AgEDbG5kAvgBAwoQ/C9H64HU1woRq3xUS1M9VxIBMBoWCgdhZGRyZXNzEgRyZWFkEgV3cml0ZRoTCgRpbmZvEgRyZWFkEgV3cml0ZRoXCghpbnZvaWNlcxIEcmVhZBIFd3JpdGUaIQoIbWFjYXJvb24SCGdlbmVyYXRlEgRyZWFkEgV3cml0ZRoWCgdtZXNzYWdlEgRyZWFkEgV3cml0ZRoXCghvZmZjaGFpbhIEcmVhZBIFd3JpdGUaFgoHb25jaGFpbhIEcmVhZBIFd3JpdGUaFAoFcGVlcnMSBHJlYWQSBXdyaXRlGhgKBnNpZ25lchIIZ2VuZXJhdGUSBHJlYWQAAAYgaFBcDnBJCZV/i8hRBTQEjjy3k7Oxdae8SBjqnop6o8g=';
const socket = '127.0.0.1:10001';

//conexion al nodo
const { lnd } = authenticatedLndGrpc({ cert, macaroon, socket });

//informacion del nodo
export async function testLNDConnection() {
  try {
    const walletInfoResponse = await getWalletInfo({ lnd });
    console.log('Info de la billetera:', walletInfoResponse);
  } catch (error) {
    console.error('Error al conectarse al nodo:', error);
  } 
}

//testLNDConnection();

// Crear recibo
export async function testcreateInvoice(amount:number) {
  try {
    const invoiceDetails = {
      description: 'Pago por productos o servicios',
      expires_at: Date.now() + 24 * 3600 * 1000,
    };

    const createInvoiceResponse = await createInvoice({
      lnd,
      description: invoiceDetails.description,
      tokens: amount,
      expires_at: invoiceDetails.expires_at,
    });

    console.log('Recibo creado:', createInvoiceResponse.request);
  } catch (error) {
    console.error('Error al crear el recibo:', error);
  }
}

//testcreateInvoice();

//balance
export async function getBalance() {
  try {
    const walletInfo = await getChainBalance({ lnd });
    console.log('Saldo del nodo:', walletInfo);
  } catch (error) {
    console.error('Error al obtener el saldo:', error);
  }
}

//getBalance();
export async function payInvoice(naomi: string) {
  try {
    const { id } = await pay({ lnd, request: naomi });
    console.log('Recibo pagado con éxito. ID de pago:', id);
  } catch (error) {
    console.error('Error al pagar el recibo:', error);
  }
}
