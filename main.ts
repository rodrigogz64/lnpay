import { Command } from 'commander';
import {testLNDConnection, testcreateInvoice, getBalance, payInvoice} from './lnd-node';

const program = new Command();

program
  .command('getinfo')
  .description('Obtener información del nodo')
  .action(() => {
    testLNDConnection();
  });

program
  .command('invoice <amount>')
  .description('Crear factura usando sats')
  .action((amount) => {
    testcreateInvoice(amount);
  });

program
  .command('balance')
  .description('Consultar saldo')
  .action(() => {
    getBalance();
  });

program
  .command('pay <invoice>')
  .description('Pagar factura')
  .action((invoice) => {
    payInvoice(invoice);
  });

program.parse(process.argv);
