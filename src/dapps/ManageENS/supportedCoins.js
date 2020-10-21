import { formatsByName } from '@ensdomains/address-encoder';
import MultiCoinValidator from 'multicoin-address-validator';

class MValidator {
  constructor(type) {
    this.type = type;
  }
  validate(address) {
    if (!address) return false;
    return MultiCoinValidator.validate(address, this.type);
  }
}
export default {
  SNC: {
    id: 60,
    symbol: 'SNC',
    name: 'MyEthereum',
    validator: new MValidator('Ethereum'),
    encode: formatsByName['ETH'].encoder,
    decode: formatsByName['ETH'].decoder
  }
};
