import dynamic from 'next/dynamic';
import { useState, useEffect, useMemo } from 'react';

const Carousel = dynamic(() => import('react-spring-3d-carousel'), {
	ssr: false,
});

interface Card {
	key: string;
	content: JSX.Element;
}

interface CarouselComponentProps {
	cards: Card[];
	offset: number;
	showArrows: boolean;
	width: string;
	height: string;
	margin: string;
}

export default function CarouselComponent(props: CarouselComponentProps) {
	const [goToSlide, setGoToSlide] = useState<number>(0);
	const [animationConfig, setAnimationConfig] = useState({
		tension: 100,
		friction: 40,
		mass: 1,
		velocity: 0,
	});

	const cards = useMemo(() => {
		return props.cards.map((element, index) => ({
			...element,
			onClick: () => setGoToSlide(index),
		}));
	}, [props.cards]);

	const offsetRadius = props.offset;
	const showArrows = props.showArrows;

	useEffect(() => {
		let interval: NodeJS.Timeout;
		let quickSpinCount = 0;
		const totalQuickSpins = props.cards.length * 2;
		const initialQuickSpinInterval = 80;
		const finalQuickSpinInterval = 200;

		const targetMass = 4;
		const targetTension = 300;
		const targetFriction = 20;

		const massIncrement =
			(targetMass - animationConfig.mass) / (totalQuickSpins - 1);
		const tensionIncrement =
			(targetTension - animationConfig.tension) / (totalQuickSpins - 1);
		const frictionIncrement =
			(animationConfig.friction - targetFriction) / (totalQuickSpins - 1);

		const quickSpin = () => {
			setGoToSlide((prevSlide) => (prevSlide + 1) % props.cards.length);
			quickSpinCount++;

			if (quickSpinCount < totalQuickSpins) {
				setAnimationConfig((prevConfig) => ({
					...prevConfig,
					mass: prevConfig.mass + massIncrement,
					tension: prevConfig.tension + tensionIncrement,
					friction: prevConfig.friction - frictionIncrement,
				}));

				const currentInterval =
					initialQuickSpinInterval +
					((finalQuickSpinInterval - initialQuickSpinInterval) /
						totalQuickSpins) *
						quickSpinCount;
				interval = setTimeout(quickSpin, currentInterval);
			} else {
				clearTimeout(interval);
			}
		};

		interval = setTimeout(quickSpin, initialQuickSpinInterval);

		return () => clearTimeout(interval);
	}, [props.cards.length]);

	return (
		<div
			style={{ width: props.width, height: props.height, margin: props.margin }}
		>
			<Carousel
				slides={cards}
				goToSlide={goToSlide}
				goToSlideDelay={0}
				offsetRadius={offsetRadius}
				showNavigation={showArrows}
				animationConfig={animationConfig}
				offsetFn={(offsetFromCenter: number) => {
					const spacingFactor = 80;
					const left = `calc(50% + ${offsetFromCenter * spacingFactor}px)`;
					const minOpacity = 0.5;
					const opacity = 1 - Math.abs(offsetFromCenter) * 0.3;
					return { left, opacity: Math.max(opacity, minOpacity) };
				}}
			/>
		</div>
	);
}
