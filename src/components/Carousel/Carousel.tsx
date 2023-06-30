import { useState } from 'react';
import type { Repository } from '../../types/github';
import {
	BsArrowLeftCircleFill,
	BsArrowRightCircleFill,
	BsEye,
	BsInfoCircle,
	BsSignMergeLeft,
	BsStar,
} from 'react-icons/bs';
import { AiOutlineFork } from 'react-icons/ai';
import { VscIssues } from 'react-icons/vsc';

type Props = {
	items: Repository[];
};

const Carousel = ({ items }: Props) => {
	const [slide, setSlide] = useState(0);

	const nextSlide = (e: React.MouseEvent) => {
		// stop propagation to stop the user from accidentally selecting the text in the card if clicking too fast
		e.stopPropagation();
		setSlide((s) => {
			if (s + 1 >= items.length) return 0;
			return s + 1;
		});
	};

	const prevSlide = (e: React.MouseEvent) => {
		// stop propagation to stop the user from accidentally selecting the text in the card if clicking too fast
		e.stopPropagation();
		setSlide((s) => {
			if (s - 1 < 0) return items.length - 1;
			return s - 1;
		});
	};

	return (
		<div className="relative flex h-96 w-full items-center justify-center">
			<BsArrowLeftCircleFill
				onClick={prevSlide}
				className="absolute left-4 h-8 w-8 rounded-full text-black shadow-md drop-shadow-sm hover:cursor-pointer"
			/>
			{items.map((repo, index) =>
				slide !== index ? null : (
					<a
						href={repo.html_url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex h-full w-full flex-col gap-2 rounded-lg bg-violet-50 p-6 px-14"
						key={repo.id}
					>
						<div className="flex items-start justify-between">
							<h6 className="text-xl">{repo.name}</h6>
							<img src={repo.owner.avatar_url} className="h-8 w-8 rounded-full" />
						</div>
						<p className="text-sm font-light">{repo.description}</p>
						<ul className="flex list-none flex-col gap-2">
							<li className="flex items-center gap-2">
								<BsStar size="16px" />
								<p className="text-sm font-light">Stars:</p>
								<p className="text-sm">{repo.stargazers_count}</p>
							</li>
							<li className="flex items-center gap-2">
								<BsEye size="16px" />
								<p className="text-sm font-light">Watches:</p>
								<p className="text-sm">{repo.watchers_count}</p>
							</li>
							<li className="flex items-center gap-2">
								<AiOutlineFork size="16px" />
								<p className="text-sm font-light">Forks:</p>
								<p className="text-sm">{repo.forks_count}</p>
							</li>
							<li className="flex items-center gap-2">
								<VscIssues size="16px" />
								<p className="text-sm font-light">Issues:</p>
								<p className="text-sm">{repo.open_issues_count}</p>
							</li>
						</ul>
					</a>
				),
			)}
			<BsArrowRightCircleFill
				onClick={nextSlide}
				className="absolute right-4 h-8 w-8 rounded-full text-black shadow-md drop-shadow-sm hover:cursor-pointer"
			/>
			<span className="absolute bottom-4 flex">
				{items.map((_, index) => (
					<button
						onClick={() => setSlide(index)}
						className={`${
							slide === index ? `bg-gray-800` : `bg-gray-300`
						} mx-1 my-0 h-2 w-2 cursor-pointer rounded-full border-none shadow-sm outline-none drop-shadow-sm`}
						key={index}
					/>
				))}
			</span>
		</div>
	);
};

export default Carousel;
