type product = {
  idProduct: string;
  quantity: string;
};
type inputCommandLineInterface = {
  items: product[];
  cpf?: string;
};

const input: inputCommandLineInterface = {
  items: [],
};

process.stdin.on('data', chunk => {
  const command = chunk.toString().replace(/\n/g, '');
  if (command.startsWith('set-cpf')) {
    const params = command.replace('set-cpf', '');
    input.cpf = params.trim();
  }
  if (command.startsWith('add-item')) {
    const params = command.replace('add-item ', '');
    const [idProduct, quantity] = params.split(' ');
    input.items.push({ idProduct, quantity: quantity.trim() });
  }
  /*   if (command.startsWith('checkout')) {
  } */
  console.log(input);
});
