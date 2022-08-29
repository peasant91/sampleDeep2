import React from "react";
import GallerySlider from "../../../tmd/components/Image/GallerySlider";
import { Page } from "../../../tmd";
import Toolbar from "../../../tmd/components/Toolbar/Toolbar";
import { ScrollView, View } from "react-native";
import Gallery from "../../../tmd/components/Image/Gallery";

export default function ImageScreen() {
  return (
    <Page>
      <Toolbar title={"Image Screen"} />
      <ScrollView>

        <GallerySlider
          backAble
          ratio={"16:10"}
          images={[
            {
              title: "Image 1",
              image: "https://res.cloudinary.com/cloudinary/image/upload/w_300/png_compression.webp",
            },
            {
              title: "Image 2",
              image: "https://images.unsplash.com1/photo-1558637845-c8b7ead71a3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            },
            {
              title: "Image 3",
              image: "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            },
            {
              title: "Image 4",
              image: "https://wallpaperaccess.com/full/1406840.jpg",
            },
            {
              title: "Image 5",
              image: "https://images.unsplash.com/photo-1518418248320-a4de2fbc87c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80",
            },
            {
              title: "Image 6",
              image: "https://cdn.wallpapersafari.com/15/4/b7xQKh.jpg",
            },
            {
              title: "Image 7",
              image: "https://images.unsplash.com/photo-1533757879476-8f4a3cb1ae4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80",
            },
            {
              title: "Image 8",
              image: "https://media.istockphoto.com/photos/swedish-lake-reflection-picture-id1290315780?k=20&m=1290315780&s=170667a&w=0&h=eVUsZ8d5RSOO0pHsYLIHWhT_Rj-iXiXoL_udQQECHZ8=",
            },
          ]}
        />

        <View style={{ height: 32 }} />
        <Gallery
          ratio={"16:9"}
          images={[
            {
              title: "Image 1",
              image: "https://picsum.photos/500/310",
            },
            {
              title: "Image 2",
              image: "https://images.unsplash.com/photo-1558637845-c8b7ead71a3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            },
            {
              title: "Image 3",
              image: "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8MTYlM0E5fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
            },
            {
              title: "Image 4",
              image: "https://wallpaperaccess.com/full/1406840.jpg",
            },
            {
              title: "Image 5",
              image: "https://images.unsplash.com/photo-1518418248320-a4de2fbc87c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHw%3D&w=1000&q=80",
            },
            {
              title: "Image 6",
              image: "https://cdn.wallpapersafari.com/15/4/b7xQKh.jpg",
            },
            {
              title: "Image 7",
              image: "https://images.unsplash.com/photo-1533757879476-8f4a3cb1ae4b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Mnx8fGVufDB8fHx8&w=1000&q=80",
            },
            {
              title: "Image 8",
              image: "https://media.istockphoto.com/photos/swedish-lake-reflection-picture-id1290315780?k=20&m=1290315780&s=170667a&w=0&h=eVUsZ8d5RSOO0pHsYLIHWhT_Rj-iXiXoL_udQQECHZ8=",
            },
          ]} />
        <View style={{ height: 32 }} />

      </ScrollView>
    </Page>
  );
}
