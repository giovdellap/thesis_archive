from flask import request, jsonify
from datetime import datetime
import requests
from flask import jsonify, request
from models.news import News, db
import os
api_key = os.environ.get("NEWS_API")

# get all news


def get_allNews():
    try:
        country = request.args.get('country')

        q = request.args.get('q')

        pageSize = request.args.get('pageSize')
        if pageSize is not None and int(pageSize) <= 0:
            pageSize = None

        page = request.args.get('page')
        if page is not None and int(page) <= 0:
            page = None

        url = f'https://newsapi.org/v2/top-headlines?category=sports'

        if country:
            url += f'&country={country}'

        if q:
            url += f'&q={q}'

        if pageSize:
            url += f'&pageSize={pageSize}'

        if page:
            url += f'&page={page}'

        url += f'&apiKey={api_key}'

        response = requests.get(url)
        allNews = response.json()

        return jsonify(allNews)
    except Exception as e:
        print("Exception:", e)
        return jsonify({"Error": e}), 404


# add news to favorite

def create_news():
    try:
        title = request.json['title']
        author = request.json['author']
        urlToImage = request.json['urlToImage']
        published_at = request.json['published_at']
        user_id = request.json['user_id']
        url = request.json['url']
        news = News(title, author, urlToImage, published_at, user_id, url)
        db.session.add(news)
        db.session.commit()
        return news.serialize
    except Exception as e:
        print("Exception:", e)
        return jsonify({"message": e}), 500


# get news from an user

def get_news(user_id):
    try:
        news = News.query.filter_by(user_id=user_id).order_by(
            News.published_at.desc()).all()

        news_list = []
        for n in news:
            news_list.append(n.serialize)

        return {'news': news_list}
    except Exception as e:
        print("Exception:", e)
        return 'No News for the user ' + str(user_id) + ' exists', 404


# edit a news

def update_news(news_id):
    try:
        # Retrieve the news instance using .one()
        news = News.query.filter_by(id=news_id).one()
        if not news:
            return jsonify({"message": "News not found"}), 404

        new_title = request.json.get('title')
        new_author = request.json.get('author')
        new_urlToImage = request.json.get('urlToImage')
        new_published_at = request.json.get('published_at')
        new_user_id = request.json.get('user_id')
        new_url = request.json.get('url')
        news.title = new_title
        news.author = new_author
        news.urlToImage = new_urlToImage
        news.published_at = new_published_at
        news.user_id = new_user_id
        news.url = new_url

        db.session.commit()
        return jsonify({"message": "News updated successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500


# delete a news from favorites

def delete_news(news_id):
    try:
        news = News.query.filter_by(id=news_id).one()
        db.session.delete(news)
        db.session.commit()
        return jsonify({"message": "News deleted successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500

def delete_all_news_user(user_id):
    try:
        all_news = News.query.filter_by(user_id=user_id).all()
        for news in all_news:
            db.session.delete(news)
        db.session.commit()
        return jsonify({"message": "All your news has been deleted correctly successfully"})
    except Exception as e:
        print("Exception:", e)  # Print the specific exception for debugging
        return jsonify({"message": "Something went wrong"}), 500
