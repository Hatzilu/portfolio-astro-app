import React, { useState } from 'react';
import type { Repository } from '../../types/github';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill, BsEye, BsStar } from 'react-icons/bs';

type Props = {
	items: Repository[];
};

const Carousel = ({ items }: Props) => {
	const [slide, setSlide] = useState(0);
	console.log({ slide });

	const nextSlide = () =>
		setSlide((s) => {
			console.log(s);
			if (s + 1 > items.length) return s;
			return s + 1;
		});

	const prevSlide = () =>
		setSlide((s) => {
			console.log(s);

			if (s - 1 < 0) return s;
			return s - 1;
		});

	return (
		<div className="relative flex h-96 w-full items-center justify-center">
			<BsArrowLeftCircleFill
				onClick={prevSlide}
				className="absolute left-4 h-8 w-8 rounded-full text-black shadow-md drop-shadow-sm hover:cursor-pointer"
			/>
			{items.map((project, index) =>
				slide !== index ? null : (
					<a
						href={project.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="h-full w-full gap-2 rounded-lg p-5 shadow-md"
						key={project.id}
					>
						<div className="flex items-center justify-between">
							<h6 className="text-base">{project.name}</h6>
							<img src={project.owner.avatar_url} className="h-8 w-8 rounded-full" />
						</div>
						<p className="text-sm font-light">{project.description}</p>
						<ul className="flex list-none flex-col gap-2">
							<li className="flex items-center gap-2">
								<BsStar size="1rem" />
								<p className="text-sm font-light">Stars:</p>
								<p className="text-sm">{project.stargazers_count}</p>
							</li>
							<li className="flex items-center gap-2">
								<BsEye size="1rem" />
								<p className="text-sm font-light">Watches:</p>
								<p className="text-sm">{project.watchers_count}</p>
							</li>
						</ul>
					</a>
				),
			)}
			<BsArrowRightCircleFill
				onClick={nextSlide}
				className="absolute right-4 h-8 w-8 rounded-full text-black shadow-md drop-shadow-sm hover:cursor-pointer"
			/>
			{items.map((_, index) => (
				<button
					onClick={() => setSlide(index)}
					className={`absolute bottom-4 mx-1 my-0 flex h-2 w-2 rounded-full ${
						slide === index ? `bg-gray-800` : `bg-white`
					} shadow-sm outline-none drop-shadow-sm`}
					key={_.id}
				/>
			))}
		</div>
	);
};

export default Carousel;
