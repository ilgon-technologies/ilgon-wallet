import ilg from './ilg';
import ilgt from './ilgt';
import ethethscan from './eth-ethscan';
const removeProtocol = s => s.replace(/^https?:\/\//, '');
export { ilg, ilgt, ethethscan, removeProtocol };
