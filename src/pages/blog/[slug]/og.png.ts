import {getMatters, type Post} from "@/content";
import type {APIRoute} from "astro";

import {site} from "@/lib/constants";
import {parseDate} from "@/lib/utils";
import {ImageResponse} from "@vercel/og";

export async function getStaticPaths() {
	const blog: any = import.meta.glob("../../../content/blog/*.md?(x)", {eager: true});
	const posts = getMatters(blog, {method: "import", type: ["blog"]});
	return posts.map((post) => ({params: {slug: post.slug}, props: {post}}));
}

export const GET: APIRoute = async ({props}) => {
	const post: Post = props.post;

	const date = parseDate(post.published.toISOString());

	// Astro doesn't support tsx endpoints so usign React-element objects
	const html = {
		type: "div",
		props: {
			children: [
				{
					type: "div",
					props: {
						tw: "shrink max-w-4xl flex mx-auto w-full",
						children: [
							{
								type: "div",
								props: {
									tw: "text-6xl font-bold text-white",
									children: post.title,
								},
							},
						],
					},
				},
				{
					type: "div",
					props: {
						tw: "shrink flex-wrap max-w-4xl items-center flex mx-auto w-full",
						style: {gap: "1rem"},
						children: [
							{
								type: "div",
								props: {
									tw: "text-lg shadow-xl bg-[#111827]/20 rounded-3xl px-3 py-1 font-bold text-white",
									children: `${date?.date} ${date?.month} ${date?.year}`,
								},
							},

							{
								type: "div",
								props: {
									tw: "h-2 w-2 shadow-xl rounded-full bg-[#111827]/20",
								},
							},

							...post.categories.map((category, i) => {
								return {
									type: "div",
									props: {
										tw: "text-lg shadow-xl bg-[#111827]/20 rounded-3xl px-3 py-1 font-bold text-white",
										children: category,
										style: {
											marginLeft: i === 0 ? "0" : "0.5rem",
										},
									},
								};
							}),

							{
								type: "div",
								props: {
									tw: "h-2 w-2 shadow-xl rounded-full bg-[#111827]/20",
								},
							},

							{
								type: "div",
								props: {
									tw: "shadow-xl text-lg  bg-[#111827]/20 rounded-3xl px-3 py-1 font-bold text-white",
									children: `${site.links.website}/blog/${post.slug}`,
								},
							},
						],
					},
				},
				{
					type: "div",
					props: {
						tw: "flex items-center absolute bottom-24 left-24 justify-center",
						children: [
							{
								type: "div",
								props: {
									// using tailwind
									tw: "w-14 h-14 mr-4 flex rounded-full shadow-xl overflow-hidden",
									children: [
										{
											type: "img",
											props: {
												src: site.author.avatar,
											},
										},
									],
								},
							},
							{
								type: "div",
								props: {
									tw: "text-white flex flex-col",
									children: [
										{
											type: "div",
											props: {
												tw: "text-xl text-center text-center font-light text-white",
												children: site.author.fullName,
											},
										},
										{
											type: "div",
											props: {
												tw: "text-xl font-bold text-center text-center font-light text-white",
												children: site.links.website,
											},
										},
									],
								},
							},
						],
					},
				},
				{
					type: "div",
					props: {
						tw: "h-10",
					},
				},
			],
			tw: "w-full h-full flex flex-col items-start justify-center relative p-20",
			style: {
				backgroundImage: "url('https://i.imgur.com/zYOgiiI.png')",
				gap: "1rem",
			},
		},
	};

	return new ImageResponse(html, {
		width: 1200,
		height: 600,
	});
};
