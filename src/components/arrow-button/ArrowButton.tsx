import clsx from 'clsx';
import arrow from '../../images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { RefObject } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick?: OnClick;
	arrowButtonRef?: RefObject<HTMLDivElement>;
};

export const ArrowButton = ({
	isOpen,
	onClick,
	arrowButtonRef,
}: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpen && styles.container_open)}
			onClick={onClick}
			ref={arrowButtonRef}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpen && styles.arrow_open)}
			/>
		</div>
	);
};
