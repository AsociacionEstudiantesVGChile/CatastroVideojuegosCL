import csv
import json

BASEPATH = "src/data/"


DEV_TEAM = {
      "name": "",
      "solodeveloper": False,
      "year": 0,
      "website": "",
      "social_media": {
        "twitter": "",
        "instagram": "",
        "linkedin": "",
        "itch_io": "",
        "steam": ""
      },
      "img_url": "",
      "region": [],
      "email": "",
      "tags": {
        "has_videogame_students": False,
        "has_women": False,
        "has_lgbtqia": False
      },
      "legal_status": "",
      "team_size": 0,
      "team_members": [],
      "games":[]}


GAME_INFO = {
    "title": "",
    "description": "",
    "img_url": "https://placehold.co/300x200/262626/ffffff/png?text=Game",
    "free": False,
    "links": {
      "website": "",
      "store": "",
      "trailer": ""
    },
    "tags": {
      "genre": [],
      "language": [],
      "platforms": []
    },
    "year": 0,
    "developer": ""
  }


TEAM_ROWS = {
    "name":[42,21,62,92], "year":[40,22,63,93], "website":[43,27,68,98], "twitter":[45,29,70,100],
    "instagram":[44,28,69,99], "linkedin":[46,30,71,101], "itch_io":[49,33,74,104],
    "steam":[50,34,75,105], "region": [41,24,65,95], "email":[47,31,72,102],
    "has_videogame_students":[5,36,77,107], "has_women":[4,35,76,106], "has_lgbtqia":[4,35,76,106],
    "team_size":[0,23,64,94], "team_members":[42,26,67,97]
    }

GAME_ROWS = {
    "title":[11,52,82], "description":[12,53,83], "store":[18,59,89], "trailer":[19,60,90],
    "genre":[16,57,87], "language":[14,55,85], "platforms":[15,56,86], "year":[13,54,84]
    }


def get_game(row, game_count=1):
    game = json.loads(json.dumps(GAME_INFO))
    for key in GAME_ROWS:
        value = GAME_ROWS[key][game_count-1]
        if key in ["store","trailer"]:
            game["links"][key] = row[value]
        elif key in ["language","platforms"]:
            game["tags"][key] = list(map(lambda i: i.strip(), row[value].split(",")))
        elif key == "genre":
            game["tags"][key] = [row[value],row[value+1]]
        elif key == "year":
            game[key] = None if row[value] == "" else int(row[value])
        else:
            game[key] = row[value]
    return game

def get_team(row, is_solo=False, team_count=1):
    team = json.loads(json.dumps(DEV_TEAM))
    for key in TEAM_ROWS:
        team["solodeveloper"] = is_solo
        value = TEAM_ROWS[key][0] if is_solo else TEAM_ROWS[key][team_count]
        if "size" in key:
            size_value = 1 if is_solo else int(row[value])
            team[key] = size_value
        elif "members" in key:
            team[key] = row[value] if is_solo else list(map(lambda i: i.strip(),row[value].replace(" y ", ",").split(",")))
        elif key == "year":
            team[key] = int(row[value])
        elif key in ["twitter","instagram","linkedin","itch_io","steam"]:
            team["social_media"][key] = row[value]
        elif key == "region":
            team[key] = list(map(lambda i: i.strip(),row[value].split(",")))
        elif key == "has_videogame_students":
            team["tags"][key] = "carrera" in row[value] if is_solo else row[value] != "" or row[value+1] != "" or row[value+2] != "" or row[value+3] != ""
        elif key == "has_women":
            team["tags"][key] = "mujer" in row[value].lower()
        elif key == "has_lgbtqia":
            lgbtqia_value = "Mujer" not in row[value] and "Hombre" not in row[value] if is_solo else "disidencias" in row[value]
            team["tags"][key] = lgbtqia_value
        else:
            team[key] = row[value]

    return team




def convert_csv_to_json(csv_file, developers_json_path = f"{BASEPATH}desarrolladores.json", games_json_path = f"{BASEPATH}videojuegos.json"):
    games = []
    developers = []

    data = []
    with open(csv_file, mode="r", encoding="utf-8") as file:
        reader = csv.reader(file, quotechar='"', delimiter=',', skipinitialspace=True)
        for row in reader:
            data.append(row)

    for row in data[1::]:
        is_solo = row[20] == "Personal"
        team = get_team(row, is_solo)
        game = get_game(row)

        team["games"].append(game["title"])
        game["developer"] = team["name"]

        has_second_game = "S" in row[51]
        has_third_game = "S" in row[81]

        if has_second_game:
            second_game = get_game(row,game_count=2)
        if has_third_game:
            third_game = get_game(row,game_count=3)

        has_second_team = "No" in row[61]
        has_third_team = "No" in row[91]

        if has_second_game and not has_second_team:
            team["games"].append(second_game["title"])
            second_game["developer"] = team["name"]
        if has_third_game and not has_third_team:
            team["games"].append(third_game["title"])
            third_game["developer"] = team["name"]

        developers.append(team)


        if has_second_team:
            second_team = get_team(row, team_count=2)
            second_team["games"].append(second_game["title"])
            second_team["developer"] = second_team["name"]
            if has_third_game and not has_third_team:
                second_team["games"].append(third_game["title"])
                third_game["developer"] = second_team["name"]

            developers.append(second_team)


        if has_third_team:
            third_team = get_team(row,team_count=3)
            third_team["games"].append(third_game["title"])
            third_game["developer"] = third_team["name"]

            developers.append(third_team)

        games.append(game)
        if has_second_game:
            games.append(second_game)
        if has_third_game:
            games.append(third_game)


    with open(developers_json_path, "w", encoding="utf-8") as dev_file:
        json.dump(developers, dev_file, indent=2)
    with open(games_json_path, "w", encoding="utf-8") as game_file:
        json.dump(games, game_file, indent=2)

    print("Done!")
            

convert_csv_to_json(f"{BASEPATH}aevg.csv")

