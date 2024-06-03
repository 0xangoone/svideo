#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate base64;
use std::fs;
use futures_util::{FutureExt, StreamExt};
use mongodb::{options::ClientOptions, results, Client, Cursor};
use serde::{Deserialize, Serialize};
use mongodb::bson::{doc, Document};
use base64::{encode, decode};

#[derive(Debug, Serialize, Deserialize,Default)]
struct Video{
    title:String,
    data:String,
    likes:i32,
}
#[tauri::command]
async fn upload_video(title: String,path: String) {
    let mut client_options = ClientOptions::parse("mongodb://localhost:27017").await.unwrap();
    client_options.app_name = Some("My App".to_string());
    let client = Client::with_options(client_options).unwrap();
    let database = client.database("svideo");
    let collection = database.collection::<Video>("videos");
    let data = fs::read(path).unwrap();
    let encoded = encode(data);
    collection.insert_one(Video {
        title:title,
        data:encoded,
        likes:0
    },None).await.unwrap();

}
#[tauri::command]
async fn read_videos() -> Vec<Video> {
    let mut videos:Vec<Video> = Vec::new();
    let mut client_options = ClientOptions::parse("mongodb://localhost:27017").await.unwrap();
    client_options.app_name = Some("My App".to_string());
    let client = Client::with_options(client_options).unwrap();
    let database = client.database("svideo");
    let collection = database.collection::<Video>("videos");

    let mut cursor = 
        collection.find(None, None).await.unwrap();
    while let Some(result) = cursor.next().await {
        videos.push(result.unwrap());
    }

    videos
}

#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![upload_video,read_videos])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
