import {component$} from '@builder.io/qwik';
import {Image, type ImageProps} from '@unpic/qwik';

export default component$<ImageProps>((props) => {
	return <Image {...props} />;
});
