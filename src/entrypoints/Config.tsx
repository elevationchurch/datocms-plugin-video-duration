import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, Form, TextField } from 'datocms-react-ui';
import { useCallback, useState } from 'react';
type PropTypes = {
  ctx: RenderManualFieldExtensionConfigScreenCtx;
};
// this is how we want to save our settings
type Parameters = {
  videoField: number;
};

export default function PluginConfig({ ctx }: PropTypes) {
  const [formValues, setFormValues] = useState<Partial<Parameters>>(
    ctx.parameters,
  );
  const update = useCallback(
    (field: string, value: string) => {
      const newParameters = { ...formValues, [field]: value };
      setFormValues(newParameters);
      ctx.setParameters(newParameters);
    },
    [formValues, setFormValues, ctx],
  );

  return (
    <Canvas ctx={ctx}>
      <Form>
        <TextField
          id='videoField'
          name='videoField'
          label='Video field ID'
          required
          value={formValues.videoField}
          onChange={update.bind(null, 'videoField')}
        />
      </Form>
    </Canvas>
  );
}
