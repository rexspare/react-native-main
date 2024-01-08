import React from 'react';
import { Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Config from 'react-native-config';

const PrivacyPolicy = () => {
  const injectedJavaScript = `
  const body = document.getElementsByTagName('body');
    for (var i = 0; i < body.length; i++) {
        body[i].style.fontFamily  = 'Roboto';
    }

  const paragraphs = document.getElementsByTagName('p');
    for (var i = 0; i < paragraphs.length; i++) {
      paragraphs[i].style.fontFamily  = 'Roboto';
    }

  const span = document.getElementsByTagName('span');
    for (var i = 0; i < span.length; i++) {
      span[i].style.fontFamily  = 'Roboto';
    }

  const p = document.getElementsByTagName('p');
    for (var i = 0; i < p.length; i++) {
      p[i].style.fontFamily  = 'Roboto';
      p[i].style.lineHeight = 2
    }
  `;

  return (
    <WebView
      nestedScrollEnabled
      startInLoadingState={true}
      style={{ marginTop: -80, height: Dimensions.get('window').height }}
      source={{
        uri: `${Config.WEBSITE_URL}privacyPolicy?mode=webview_content_only`,
      }}
      injectedJavaScript={injectedJavaScript}
    />
  );
};

export default PrivacyPolicy;
