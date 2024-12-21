import {Link} from "react-router-dom";

const NotFoundPage = () => {
	return (
		<section className="bg-white">
			<div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
				<div className="mx-auto max-w-screen-sm text-center">
					<h1
						className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl ">404</h1>
					<div className={"flex justify-center"}>
						<img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg" alt=""/>
					</div>
					<p className="mb-4 text-lg font-light  ">К сожалению, мы не можем найти эту страницу. На главной
						странице вы найдете много интересного. </p>
					<Link to="/"
					      className="inline-flex  bg-black text-white hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4">
						Вернуться на главную страницу
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFoundPage;