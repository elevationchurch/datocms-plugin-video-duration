import {
  RenderFieldExtensionCtx,
  RenderManualFieldExtensionConfigScreenCtx,
  connect,
} from 'datocms-plugin-sdk';
import { render } from './utils/render';
import Plugin from './entrypoints/Plugin';
import 'datocms-react-ui/styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import PluginConfig from './entrypoints/Config';

connect({
  manualFieldExtensions: () => {
    return [
      {
        id: 'videoDuration',
        name: 'Video Duration',
        type: 'editor',
        fieldTypes: 'all',
        configurable: true,
      },
    ];
  },
  renderManualFieldExtensionConfigScreen(
    _fieldExtensionId: string,
    ctx: RenderManualFieldExtensionConfigScreenCtx,
  ) {
    ReactDOM.render(
      <React.StrictMode>
        <PluginConfig ctx={ctx} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    switch (fieldExtensionId) {
      case 'videoDuration':
        return render(<Plugin ctx={ctx} />);
    }
  },
});
