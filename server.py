from flask import Flask, redirect, request, jsonify, session, render_template
from spotipy import Spotify, SpotifyOAuth

app = Flask(__name__)
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# Spotify API configuration
SPOTIPY_CLIENT_ID = 'd7633c6c884e4a26ba105105422becea'
SPOTIPY_CLIENT_SECRET = '03aa0e231e0e4e19af41dadebac8e55d'
SPOTIPY_REDIRECT_URI = 'http://localhost:5000/callback'

# Spotify OAuth object
sp_oauth = SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID,
                        client_secret=SPOTIPY_CLIENT_SECRET,
                        redirect_uri=SPOTIPY_REDIRECT_URI,
                        scope="user-library-read")

# Login endpoint
@app.route('/login')
def index():
    auth_url = sp_oauth.get_authorize_url()
    return render_template('login.html' , auth_url=auth_url)

# Callback endpoint which gets the auth token and saves it to the session for later use
@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)

    access_token = token_info['access_token']
    session['access_token'] = access_token
    return redirect('/profile')

# Profile endpoint, with all the datas of the user (For the My Profile Page)
@app.route('/profile')
def get_user_data():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            user_info = sp.current_user()
            return jsonify(user_info)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
# Getting the users top tracks from the last 4 weeks
@app.route('/my-top-tracks-short')
def get_top_tracks_short():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_tracks_week = sp.current_user_top_tracks(time_range='short_term', limit=50)
            return jsonify(top_tracks_week)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
# Getting the users top tracks from the last 6 month
@app.route('/my-top-tracks-medium')
def get_top_tracks_medium():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_tracks_month = sp.current_user_top_tracks(time_range='medium_term', limit=50) 
            return jsonify(top_tracks_month)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
# Getting the users top tracks from all the time
@app.route('/my-top-tracks-long')
def get_top_tracks_long():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_tracks_year = sp.current_user_top_tracks(time_range='long_term', limit=50)
            return jsonify(top_tracks_year)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
# Getting the users top artists from the last 4 weeks
@app.route('/my-top-artists-short')
def get_top_artists_short():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_artists_week = sp.current_user_top_artists(time_range='short_term', limit=10)
            return jsonify(top_artists_week)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400

# Getting the users top artists from the last 6 months
@app.route('/my-top-artists-medium')
def get_top_artists_medium():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_artists_month = sp.current_user_top_artists(time_range='medium_term', limit=10)
            return jsonify(top_artists_month)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
# Getting the users top artists from all the time
@app.route('/my-top-artists-long')
def get_top_artists_long():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_artists_month = sp.current_user_top_artists(time_range='medium_term', limit=10)
            return jsonify(top_artists_month)
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
# Getting the users top genres from the last 4 weeks
@app.route('/top-genres-short')
def get_top_genres_short():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            results_artists = sp.current_user_top_artists(limit=50, offset=0, time_range='short_term')
            list_of_genres = []
            for result_artist in results_artists["items"]:
                artist_genres = result_artist["genres"]
                list_of_genres.extend(artist_genres)
            return jsonify(list_of_genres)
        except Exception as e:
            return jsonify({'error' : str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    

# Getting the users top genres from the last 6 months    
@app.route('/top-genres-medium')
def get_top_genres_medium():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            results_artists = sp.current_user_top_artists(limit=50, offset=0, time_range='medium_term')
            list_of_genres = []
            for result_artist in results_artists["items"]:
                artist_genres = result_artist["genres"]
                list_of_genres.extend(artist_genres)
            return jsonify(list_of_genres)
        except Exception as e:
            return jsonify({'error' : str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400


# Getting the users top genres from all the time
@app.route('/top-genres-long')
def get_top_genres_long():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            results_artists = sp.current_user_top_artists(limit=50, offset=0, time_range='long_term')
            list_of_genres = []
            for result_artist in results_artists["items"]:
                artist_genres = result_artist["genres"]
                list_of_genres.extend(artist_genres)
            return jsonify(list_of_genres)
        except Exception as e:
            return jsonify({'error' : str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
if __name__ == "__main__":
    app.run(debug=True)