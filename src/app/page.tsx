'use client';

import './App.css';
import { v4 as uuidv4 } from 'uuid';
import Card from './Card';
import Carousel from './Carousel';
import { config } from 'react-spring';

function App() {
	const animationConfig = config.slow;
	let cards = [
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2017/12/convertplus_thumbnail.jpg' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2017/12/convertplus_thumbnail.jpg' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2017/12/acf_pro.png' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2016/08/slider_revolution-1.png' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2019/01/pwa_880_660.jpg' />
			),
		},
		{
			key: uuidv4(),
			content: (
				<Card imageSource='https://updates.theme-fusion.com/wp-content/uploads/2017/12/layer_slider_plugin_thumb.png' />
			),
		},
	];

	return (
		<div className=''>
			<Carousel
				cards={cards}
				height='500px'
				width='30%'
				margin='0 auto'
				offset={3}
				showArrows={true}
			/>
		</div>
	);
}

export default App;
