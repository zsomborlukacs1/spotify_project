from flask import Flask, redirect, request, jsonify, session, render_template
from spotipy import Spotify, SpotifyOAuth
from datetime import datetime, timedelta

app = Flask(__name__,static_folder='static', static_url_path='/static')
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'

# Spotify API configuration
SPOTIPY_CLIENT_ID = '27fe7d1bfb904201b317cc6a58e5020e'
SPOTIPY_CLIENT_SECRET = '22e59df7d94d42febf83654897266f6d'
SPOTIPY_REDIRECT_URI = 'https://spotify-project-chi.vercel.app/callback'

# Spotify OAuth object
sp_oauth = SpotifyOAuth(client_id=SPOTIPY_CLIENT_ID,
                        client_secret=SPOTIPY_CLIENT_SECRET,
                        redirect_uri=SPOTIPY_REDIRECT_URI,
                        scope="user-library-read,user-top-read,playlist-read-private,playlist-read-collaborative,playlist-modify-private,playlist-modify-public")

@app.route('/')
def index():
    return redirect('/login')

# Login endpoint
@app.route('/login')
def login():
    auth_url = sp_oauth.get_authorize_url()
    return render_template('login.html' , auth_url=auth_url)

# Callback endpoint which gets the auth token and saves it to the session for later use
@app.route('/callback')
def callback():
    code = request.args.get('code')
    token_info = sp_oauth.get_access_token(code)

    access_token = token_info['access_token']
    session['access_token'] = access_token
    return redirect('/home')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/top-songs')
def top_songs():
    return render_template('top_songs.html')

@app.route('/top-artists')
def top_artists():
    return render_template('top_artists.html')

@app.route('/top-genres')
def top_genres():
    return render_template('top_genres.html')

@app.route('/discover')
def discover():
    return render_template('new_songs.html')

@app.route('/logout')
def logout():
    return render_template('login.html')
    
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
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'Please relogin': str(e)}), 500
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
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
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
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
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
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
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
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
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
            top_artists_month = sp.current_user_top_artists(time_range='long_term', limit=10)
            return jsonify(top_artists_month)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
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
            results_artists = sp.current_user_top_artists(time_range='short_term', limit=10)
            list_of_genres = []
            for result_artist in results_artists["items"]:
                artist_genres = result_artist["genres"]
                list_of_genres.extend(artist_genres)
            return jsonify(list_of_genres)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
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
            results_artists = sp.current_user_top_artists(limit=10, offset=0, time_range='medium_term')
            list_of_genres = []
            for result_artist in results_artists["items"]:
                artist_genres = result_artist["genres"]
                list_of_genres.extend(artist_genres)
            return jsonify(list_of_genres)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error' : str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400


# Getting the users top genres from last year
@app.route('/top-genres-long')
def get_top_genres_long():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            results_artists = sp.current_user_top_artists(limit=10, offset=0, time_range='long_term')
            list_of_genres = []
            for result_artist in results_artists["items"]:
                artist_genres = result_artist["genres"]
                list_of_genres.extend(artist_genres)
            return jsonify(list_of_genres)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error' : str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400 
    
#endpoints for the dashboard

#top 10 tracks in short term 
@app.route('/top-tracks-chart')
def get_top_tracks_chart():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_tracks_week = sp.current_user_top_tracks(time_range='short_term', limit=10)
            return jsonify(top_tracks_week)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
@app.route('/top-artists-dash')
def get_top_artists_dash():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_artists_week = sp.current_user_top_artists(time_range='short_term', limit=10)
            return jsonify(top_artists_week)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400

#favourite genres from the past year (pie chart)    
@app.route('/top-genres-chart')
def get_top_genres_chart():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            results_artists = sp.current_user_top_artists(limit=3, time_range='long_term')
            list_of_genres = []
            for result_artist in results_artists["items"]:
                artist_genres = result_artist["genres"]
                list_of_genres.extend(artist_genres)
            return jsonify(list_of_genres)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error' : str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
#top 10 artists from the last month    
@app.route('/my-top-artists-chart')
def get_top_artists_chart():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_artists_week = sp.current_user_top_artists(time_range='short_term', limit=10)
            return jsonify(top_artists_week)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400

@app.route('/recommendations-dash')
def get_recommendations_dash():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            
            top_tracks = sp.current_user_top_tracks(time_range='short_term', limit=5)
            track_ids = [track["id"] for track in top_tracks["items"]] 

            recommendations = sp.recommendations(seed_tracks=track_ids, limit=50)
            formatted_recommendations = []
            for position, track in enumerate(recommendations['tracks'], start=1):
                if track.get('preview_url'):
                    track_info = {
                        'position': position,
                        'name': track['name'],
                        'artists': [artist['name'] for artist in track['artists']],
                        'image': track['album']['images'][0]['url'] if track['album']['images'] else None,
                        'preview_url': track['preview_url']
                    }
                    formatted_recommendations.append(track_info)
            return jsonify(formatted_recommendations)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400

#Music recommendation system
    
@app.route('/recommendations-artists')
def get_recommendations_artists():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_artists = sp.current_user_top_artists(time_range='medium_term', limit=5)
            artist_ids = [artist["id"] for artist in top_artists["items"]]
            recommendations = sp.recommendations(seed_artists=artist_ids, limit=50)
            formatted_recommendations = []
            for position, track in enumerate(recommendations['tracks'], start=1):
                if track.get('preview_url'):
                    track_info = {
                        'position': position,
                        'name': track['name'],
                        'artists': [artist['name'] for artist in track['artists']],
                        'image': track['album']['images'][0]['url'] if track['album']['images'] else None,
                        'preview_url': track['preview_url'],
                        'track_uri': track['uri']
                    }
                    formatted_recommendations.append(track_info)
            return jsonify(formatted_recommendations)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
@app.route('/recommendations-songs')
def get_recommendations_songs():
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_tracks = sp.current_user_top_tracks(time_range='long_term', limit=5)
            track_ids = [track["id"] for track in top_tracks["items"]]
            recommendations = sp.recommendations(seed_tracks=track_ids, limit=50)
            formatted_recommendations = []
            for position, track in enumerate(recommendations['tracks'], start=1):
                if track.get('preview_url'):
                    track_info = {
                        'position': position,
                        'name': track['name'],
                        'artists': [artist['name'] for artist in track['artists']],
                        'image': track['album']['images'][0]['url'] if track['album']['images'] else None,
                        'preview_url': track['preview_url'],
                        'track_uri': track['uri']
                    }
                    formatted_recommendations.append(track_info)
            return jsonify(formatted_recommendations)
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400
    
#Create playlist for top songs page
@app.route('/create-playlist-short')
def create_playlist_short():
    return create_playlist('short_term')

@app.route('/create-playlist-medium')
def create_playlist_medium():
    return create_playlist('medium_term')

@app.route('/create-playlist-long')
def create_playlist_long():
    return create_playlist('long_term')

def get_playlist_name(time_range):
    if time_range == 'short_term':
        current_month = datetime.now().strftime("%B")
        return f'Datafy Top 50 Tracks {current_month}'
    elif time_range == 'medium_term':
        return 'Datafy Top 50 Tracks (Last 6 months)'
    elif time_range == 'long_term':
        return f'Datafy Top 50 Tracks From ~1 year'
    else:
        return 'Unknown Time Range'

def create_playlist(time_range):
    access_token = session.get('access_token')
    if access_token:
        sp = Spotify(auth=access_token)
        try:
            top_tracks = sp.current_user_top_tracks(time_range=time_range, limit=50)
            track_uris = [track['uri'] for track in top_tracks['items']]
            playlist_name = get_playlist_name(time_range)
            playlist = sp.user_playlist_create(sp.current_user()['id'], playlist_name, public=False)
            playlist_id = playlist['id']
            sp.user_playlist_add_tracks(sp.current_user()['id'], playlist_id, track_uris)
            return jsonify({'success': True, 'playlist_id': playlist_id})
        except Exception as e:
            if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Access token is missing.'}), 400

#add recommended track to Datafy Recommended Playlist    
@app.route('/add-to-recommended-playlist', methods=['GET'])
def add_to_recommended_playlist():
    access_token = session.get('access_token')
    if not access_token:
        return jsonify({'error': 'Access token is missing.'}), 400

    track_uri = request.args.get('track_uri')
    if not track_uri:
        return jsonify({'error': 'Track URI is missing.'}), 400

    sp = Spotify(auth=access_token)
    try:
        user_id = sp.current_user()['id']
        playlists = sp.current_user_playlists()
        playlist_id = None

        for playlist in playlists['items']:
            if playlist['name'] == 'Datafy Recommendations':
                playlist_id = playlist['id']
                break

        if not playlist_id:
            new_playlist = sp.user_playlist_create(user=user_id, name='Datafy Recommendations', public=False)
            playlist_id = new_playlist['id']

        sp.playlist_add_items(playlist_id, [track_uri])
        return jsonify({'success': True})
    except Exception as e:
        if e.http_status == 401:
                return jsonify({'error': 'Access token expired, please relogin.'}), 401
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
