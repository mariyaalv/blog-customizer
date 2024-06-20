import { ArrowButton } from '../arrow-button';
import { Button } from '../button';

import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import {
	Dispatch,
	FormEventHandler,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import { Separator } from '../separator';
import clsx from 'clsx';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (params: ArticleStateType) => void;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
	isOpen,
	setIsOpen,
}: ArticleParamsFormProps) => {
	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [width, setWidth] = useState(articleState.contentWidth);
	const [bgColor, setBgColor] = useState(articleState.backgroundColor);

	const handleFormSubmit: FormEventHandler<HTMLFormElement> = (evt) => {
		evt.preventDefault();
	};

	const handleButtonSubmit = (): void => {
		setArticleState({
			fontFamilyOption: fontFamily,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: width,
			fontSizeOption: fontSize,
		});
		setIsOpen(false);
	};

	const resetArticleState = () => {
		setArticleState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setWidth(defaultArticleState.contentWidth);
		setBgColor(defaultArticleState.backgroundColor);
	};

	const arrowButtonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleArrowButtonClick(evt: MouseEvent) {
			setIsOpen((isOpen) => !isOpen);
			evt.stopPropagation();
		}
		arrowButtonRef.current?.addEventListener('click', handleArrowButtonClick);
		return () => {
			arrowButtonRef.current?.removeEventListener(
				'click',
				handleArrowButtonClick
			);
		};
	}, []);

	return (
		<>
			<ArrowButton arrowButtonRef={arrowButtonRef} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				onClick={(evt) => evt.stopPropagation()}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={(option) => setFontFamily(option)}
						title='Шрифт'
					/>
					<RadioGroup
						selected={fontSize}
						options={fontSizeOptions}
						onChange={(option) => setFontSize(option)}
						name='fontSize'
						title='Размер шрифта'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={(option) => setFontColor(option)}
						title='Цвет шифта'
					/>
					<Separator />
					<Select
						selected={bgColor}
						options={backgroundColors}
						onChange={(option) => setBgColor(option)}
						title='Цвет фона'
					/>
					<Select
						selected={width}
						options={contentWidthArr}
						onChange={(option) => setWidth(option)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={resetArticleState} />
						<Button
							title='Применить'
							type='submit'
							onClick={handleButtonSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
