import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import {
  Canvas,
  DropdownOption,
  Form,
  SelectField,
  SelectInput,
  SwitchField,
  TextField,
} from 'datocms-react-ui';
import { useCallback, useState } from 'react';
type PropTypes = {
  ctx: RenderManualFieldExtensionConfigScreenCtx;
};
// this is how we want to save our settings
type Parameters = {
  videoField: number;
  mediaType: {
    label: 'Video' | 'Audio';
    value: 'video' | 'audio';
  };
  hideField: boolean;
};

export default function PluginConfig({ ctx }: PropTypes) {
  const [formValues, setFormValues] = useState<Partial<Parameters>>(
    ctx.parameters,
  );

  const setSourceFieldName = useCallback(
    (field: string, value: any) => {
      const newParameters = { ...formValues, [field]: value };
      setFormValues(newParameters);
      ctx.setParameters(newParameters);
    },
    [formValues, setFormValues, ctx],
  );

  return (
    <Canvas ctx={ctx}>
      <Form>
        <SelectField
          name='mediaType'
          id='mediaType'
          label='Media Type'
          hint='Select the media type'
          value={formValues.mediaType}
          selectInputProps={{
            options: [
              { label: 'Video', value: 'video' },
              { label: 'Audio', value: 'audio' },
            ],
          }}
          required
          onChange={setSourceFieldName.bind(null, 'mediaType')}
        />
        <TextField
          id='videoField'
          name='videoField'
          label='Video or audio field ID'
          hint='The field that contains a link to a video or audio resource'
          required
          value={formValues.videoField}
          onChange={setSourceFieldName.bind(null, 'videoField')}
        />
        <SwitchField
          name='hideField'
          id='hideField'
          label='Hide field?'
          hint='Whether or not to hide the field in document'
          value={formValues.hideField || false}
          onChange={setSourceFieldName.bind(null, 'hideField')}
        />
      </Form>
    </Canvas>
  );
}
