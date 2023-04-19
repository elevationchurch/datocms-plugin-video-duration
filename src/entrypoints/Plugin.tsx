import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, FieldWrapper, Form, TextInput } from 'datocms-react-ui';

type Props = {
  ctx: RenderFieldExtensionCtx;
};

const formatTime = (time: number, ctx: RenderFieldExtensionCtx) => {
  let duration = '';

  if (!time) return;

  const seconds = time % 60;
  const minutes = ((time - seconds) / 60) % 60;
  const hours = Math.floor(time / 3600);

  const formatForTime = (n: number) =>
    n < 10 ? `0${n.toString()}` : n.toString();

  if (hours > 0) {
    duration += `${formatForTime(hours)}:`;
  }

  duration += `${formatForTime(minutes)}:`;
  duration += formatForTime(Math.floor(seconds));

  ctx.setFieldValue(ctx.fieldPath, duration);
};

export default function ConfigScreen({ ctx }: Props) {
  return (
    <Canvas ctx={ctx}>
      {(ctx.parameters.mediaType as any).value === 'video' ? (
        <video
          style={{ display: 'none' }}
          onLoadedData={(e) => formatTime(e.currentTarget.duration, ctx)}
          src={ctx.formValues[ctx.parameters.videoField as string] as string}
        />
      ) : (
        <audio
          style={{ display: 'none' }}
          onLoadedData={(e) => formatTime(e.currentTarget.duration, ctx)}
          src={ctx.formValues[ctx.parameters.videoField as string] as string}
        />
      )}
      <div style={{ display: ctx.parameters.hideField ? 'none' : 'block' }}>
        <Form>
          <FieldWrapper
            label='Video Duration'
            id={`${ctx.field.id}--field-wrapper`}
          >
            <TextInput value={ctx.formValues[ctx.fieldPath] as string} />
          </FieldWrapper>
        </Form>
      </div>
    </Canvas>
  );
}
