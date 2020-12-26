import React, {Component, useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {SafeAreaView, Dimensions, ActivityIndicator, AsyncStorage} from 'react-native';
// const localWebUrl = require('./pay.html');
// import HTML from 'react-native-render-html';
import * as FileSystem from "expo-file-system";
import AssetUtils from 'expo-asset-utils';
import {executeRequest} from "../../utils";


// import {localWebUrl} from './pay.html';

function PaymentWidget(props) {
  // const [renderedOnce, setRenderedOnce] = useState(false);
  // const [html,setHtml]=React.useState("")
  const webviewRef = React.useRef(null)
  // useEffect(() => {
  //   setRenderedOnce(true);
  //   /*async function load(){
  //     // const{uri}=AssetUtils.fromModule(require("./pay.html"))
  //     // console.log(uri)
  //     // const res = await fetch(uri)
  //     // const html = await res.text()
  //     const localUri = await AssetUtils.resolveAsync('./pay.html')
  //     console.log("got html",localUri)
  //     const fileUri = await FileSystem.getContentUriAsync(localUri)
  //     setHtml(fileUri)
  //   }
  //   load()*/
  // }, [])

  const useHtmlUri = file => {
    const [htmlUri, setHtmlFile] = useState(null)

    useEffect(() => {
      const loadHTMLUri = async () => {
        const {localUri} = await AssetUtils.resolveAsync(file)
        const fileUri = await FileSystem.getContentUriAsync(localUri)
        setHtmlFile(fileUri)
      }

      loadHTMLUri()
    }, [file])

    return htmlUri
  }

  const sendPayment = async (data) => {
    const token = await AsyncStorage.getItem('jwt');

    await executeRequest({
      method: 'POST',
      url: 'private/client/payments',
      body: {
        content: data,
        contentType: 'application/json',
      },
      token,chat
    })

    props.navigation.navigate("PAYMENT_SCREEN")
  }

  useHtmlUri(require('./subscribe.html'))
  useHtmlUri(require('./pay.html'))

  // console.log(localWebUrl)
  // console.log(htmlUri)

  return (
    <SafeAreaView style={{width: "100%", height: "100%"}}>
      <WebView
        ref={webviewRef}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        javaScriptEnabledAndroid={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={true}
        source={require('./pay.html')}
        onLoadEnd={() => webviewRef.current.injectJavaScript(jsScript)}
        onMessage={(event) => {
          sendPayment(event.nativeEvent.data);
        }}
        // injectedJavaScript={`document.querySelector('.token').value = 'jopa'`}
        // ref={ref => this.webview = ref}
        // userAgent='Mozilla/5.0 (Linux; Android 6.0; LG-K350 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Mobile Safari/537.36'
        // allowsBackForwardNavigationGestures={true}
        // mixedContentMode="always"
        // pagingEnabled
        // style={{width: "90%", height: "90%"}}
        // source={{uri: "file:///android_assets/pay.html"}}
        // source={renderedOnce ? {html: html} : {}}
        // source={renderedOnce ? {uri: "https://show.cloudpayments.ru/widget/"} : {}}
        // allowsFullscreenVideo={true}
        // allowsBackForwardNavigationGestures={true}
        // allowsInlineMediaPlayback={true}
        // allowsLinkPreview={true}
        // automaticallyAdjustContentInsets={true}
        // accessible={true}
        // thirdPartyCookiesEnabled={true}
        // useSharedProcessPool={true}
        // cacheEnabled={false}
        // allowFileAccessFromFileURLs={true}
        // allowingReadAccessToURL={localWebUrl}

        // useWebKit={true}
        // startInLoadingState={true}
        // scrollEnabled={true}
        // source={{html: localWebUrl}}
      />
    </SafeAreaView>
  );
}

// function uuidv4() {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//     (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
// }

const jsScript = `const pay = function () {
          let widget = new cp.CloudPayments();
      
          const receipt = {
            description: 'Единоразовая оплата консультации', //наименование товара
            price: ${100000000000}, //цена
            amount: 1500.00, //сумма
            quantity: 1, //количество
            durationInMinutes: 60,
          };
      
          let data = {};
          data.receipt = receipt;
          data.paymentOption = 'acquiring';
      
          widget.charge({
              publicId: "pk_0ae876e52e8225495c4aefa4c339f",
              description: 'Единоразовая оплата консультации',
              amount: 1500,
              currency: 'RUB',
              invoiceId: '1234567',
              accountId: '1111111',
              skin: "mini",
              data: data
            },
            function (options) { // success
              window.ReactNativeWebView.postMessage(JSON.stringify(options, null, 2))
              // alert(JSON.stringify(options, null, 2));
            },
            function (reason, options) { // fail
              // alert(JSON.stringify(reason, null, 2));
              window.ReactNativeWebView.postMessage(JSON.stringify(options, null, 2))
              // console.log(JSON.stringify(options, null, 2));
            });
        };
        pay();`

// <HTML html={html} imagesMaxWidth={Dimensions.get('window').width} />

const html = `<!doctype html>
                <html style="height: 100%; width: 100%; padding: 0; margin: 0" lang="en">
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, user-scalable=no,
                       initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                      <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  </head>
                  <body> 
                      <script src="https://widget.cloudpayments.ru/bundles/cloudpayments"></script>
                      <script type="text/javascript">
                            function pay() {
                             let widget = new cp.CloudPayments();
                             widget.charge({
                                      publicId: "pk_0ae876e52e8225495c4aefa4c339f",
                                      description: 'Единоразовая оплата консультации',
                                      amount: 1500,
                                      currency: 'RUB',
                                      invoiceId: '1234567',
                                      accountId: 'user@example.com',
                                      skin: "mini",
                                      data: {
                                        myProp: 'myProp value'
                                      }
                                  },
                                  function (options) {
                                      alert(options);
                                  },
                                  function (reason, options) {
                                      alert(reason);
                                  })
                        };
                        pay();
                    </script>
                    </body>
                  </html>`

export default PaymentWidget;

/*
// var xhr = new XMLHttpRequest();
          // xhr.open("POST", yourUrl, true);
          // xhr.setRequestHeader('Content-Type', 'application/json');
          // data = {
          //   token: "",
          //   options
          // }
          // xhr.send(JSON.stringify({
          //   value: value
          // }));
          // const response = await executeRequest({
          //   method: "POST",
          //   endpoint: `/private/admin/payment/subscribe`,
          //   token,
          //   body: {
          //     contentType: "application/json",
          //     content: JSON.stringify(options)
          //   }
          // })
<script type="text/javascript">
                        const createCryptogram = function () {
                                  const result = checkout.createCryptogramPacket();

                                  if (result.success) {
                                      // сформирована криптограмма
                                      alert(result.packet);
                                  }
                                  else {
                                      // найдены ошибки в введённых данных, объект `result.messages` формата:
                                      // { name: "В имени держателя карты слишком много символов", cardNumber: "Неправильный номер карты" }
                                      // где `name`, `cardNumber` соответствуют значениям атрибутов `<input ... data-cp="cardNumber">`
                                     for (var msgName in result.messages) {
                                         alert(result.messages[msgName]);
                                     }
                                  }
                              };
                              document.querySelector('#paymentFormSample').addEventListener('click', (e) => {
                                e.preventDefault()
                                checkout =  new cp.Checkout('test_api_00000000000000000000001')

                                const result = checkout.createCryptogramPacket();

                                  if (result.success) {
                                    alert(result);
                                    // сформирована криптограмма
                                  } else {
                                    for (var msgName in result.messages) {
                                      alert(result.messages[msgName]);
                                    }
                                  }
                              })

                      </script>
<script type="text/javascript" src="https://widget.cloudpayments.ru/bundles/checkout"></script>
<form id="paymentFormSample" autocomplete="off">
                    <input type="text" value="5200828282828210" data-cp="cardNumber">
                    <input type="text" value="12" data-cp="expDateMonth">
                    <input type="text" value="21" data-cp="expDateYear">
                    <input type="text" value="123" data-cp="cvv">
                    <input type="text" value="ant" data-cp="name">
                    <button type="submit">Оплатить 100 р.</button>
                </form>
const pay = async (e) => {
    e.preventDefault()
    let widget = new window.cp.CloudPayments();
    widget.charge(
      { // options
        publicId: 'test_api_00000000000000000000001',  //id из личного кабинета
        description: 'Единоразовая оплата консультации', //назначение
        amount: 1500, //сумма
        currency: 'RUB', //валюта
        invoiceId: '1234567', //номер заказа  (необязательно)
        accountId: 'user@example.com', //идентификатор плательщика (необязательно)
        skin: "mini", //дизайн виджета
      },
      async function (options) { //
        //действие при успешной оплатеsuccess
        console.log(JSON.stringify(options, null, 2));
        const response = await executeRequest({
          method: "POST",
          endpoint: `/private/admin/payment`,
          token,
          body: {
            contentType: "application/json",
            content: JSON.stringify(options)
          }
        })
      },
      async function (reason, options) { // fail
        //действие при неуспешной оплате
        console.log(JSON.stringify(reason, null, 2));
        console.log(JSON.stringify(options, null, 2));
      });
  }
 */