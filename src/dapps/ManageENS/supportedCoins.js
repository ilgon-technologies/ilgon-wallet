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
  ETH: {
    id: 60,
    symbol: 'ETH',
    name: 'Ethereum',
    validator: new MValidator('Ethereum'),
    encode: formatsByName['ETH'].encoder,
    decode: formatsByName['ETH'].decoder
  }
};
