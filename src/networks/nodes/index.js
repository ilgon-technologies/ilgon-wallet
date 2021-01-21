import ilg from './ilg';
import ilgt from './ilgt';
import ilgd from './ilgd';
import ethethscan from './eth-ethscan';
const removeProtocol = s => s.replace(/^https?:\/\//, '');
export { ilg, ilgt, ilgd, ethethscan, removeProtocol };
