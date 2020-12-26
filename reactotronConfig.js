import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

export default Reactotron.configure({ host: 'LOCAL_IP' })
  .useReactNative()
  .use(reactotronRedux())
  .connect();
