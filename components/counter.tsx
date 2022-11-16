import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Counter = ({ target, title, duration }) => {
	const [ref, inView] = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	return (
		<div ref={ref}>
			<CountUp
				start={0}
				end={inView ? target : 0}
				duration={duration}
				separator='.'
				useEasing={true}>
				{({ countUpRef }) => (
					<span ref={countUpRef} />
				)}
			</CountUp>
				{title}
			<style jsx>{`
				.delay {
					transition-delay: ${duration}s;
				}
				.transform-hide {
					transform: translate3d(0, 1rem, 0);
				}
				.transform-show {
					transform: translate3d(0, 0, 0);
				}
			`}</style>
		</div>
	);
};

export default Counter;