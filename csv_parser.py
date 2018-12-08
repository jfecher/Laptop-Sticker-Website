import csv

filename = "Laptop Sticker Survey (Responses) - Form Responses 1.csv"
responses = []
output_filename = "populate_db.sql"

# Order of csv is:
# timestamp major gender hometown survey_loc brand model screen_size
# purchase_date pic likelyhood_to_buy_more likelyhood_to_put_more_on
responses = []

with open(filename, 'r') as csvfile:
    dialect = csv.Sniffer().sniff(csvfile.read(2048))
    csvfile.seek(0)
    reader = csv.DictReader(csvfile, dialect=dialect, skipinitialspace=True,
                              quoting=csv.QUOTE_MINIMAL, doublequote=True)

    for i, row in enumerate(reader):
        responses.append([])
        for idx, kv in row.items():
            responses[i].append(kv)


def allNthItems(l, n):
    ret = []
    for row in l:
        for i, value in enumerate(row):
            if i == n:
                ret.append(value)
                break
    return ret

def sql_list(l):
    s = ""
    for idx, val in enumerate(l):
        s += "\t({}, '{}')".format(idx, val)
        if idx != len(l) - 1:
            s += ",\n"
    return s

# insert into person (person_id, major_id, hometown_location_id, survey_location_id, laptop_id, likelihood_to_buy_more, likelihood_to_put_more)
#     values (0, 0, 0, 1, 0, 1, 10);

# person_id INT NOT NULL,
# major_id INT NOT NULL,
# hometown_location_id INT NOT NULL,
# laptop_id INT NOT NULL,
# laptop_purchased_dt TIMESTAMP(0) NULL,
# laptop_picture_url VARCHAR(50) NULL,
# likelihood_to_buy_more INT NULL,
# likelihood_to_put_more INT NULL,
# survey_location_id INT NOT NULL,
# 
# Generate a string of the person table
# Must be run after laptop_tbl!
def person_tbl(l):
    s = ""
    for pk, row in enumerate(l):
        major_id = majors.index(row[1])
        hometown_id = hometowns.index(row[3])
        survey_loc_id = survey_loc.index(row[4])
        laptop_id = laptops[row[6]]
        s += "\t({}, {}, {}, {}, {}, {}, {}),\n".format(pk+1, major_id, hometown_id, survey_loc_id, laptop_id, row[10], row[11])
    return s[0:-2]

def person_updates(l):
    s = ""
    for pk, row in enumerate(l):
        s += "update person set gender='{}', laptop_purchased_dt='{}', laptop_picture_url='{}' where player_id={}\n".format(row[2], row[8], row[9], pk+1)
    return s

# Returns the list of values in:
# insert into laptop (laptop_id, screen_size, brand, model) values (0, 13.0, 'Apple', 'Macbook Air'), ..., ...;
def laptop_tbl(l):
    s = ""
    global laptops

    for pk, row in enumerate(l):
        # Assume all same models have same size, brand
        if not row[6] in laptops: # row[6] = model
            laptops[row[6]] = pk
            s += "\t({}, '{}', '{}', '{}'),\n".format(pk, row[7], row[5], row[6])
    return s[0:-2]


# columns with removed duplicates
majors = list(set(allNthItems(responses, 1)))
hometowns = list(set(allNthItems(responses, 3)))
survey_loc = list(set(allNthItems(responses, 4)))
laptops = {}  # map from model to laptop pk

insert_str = "insert into {} values\n{};\n\n"

with open(output_filename, 'w') as out:
    out.write(insert_str.format("major", sql_list(majors)))
    out.write(insert_str.format("hometown", sql_list(hometowns)))
    out.write(insert_str.format("survey_loc", sql_list(survey_loc)))
    out.write(insert_str.format("laptop", laptop_tbl(responses)))
    out.write(insert_str.format("person", person_tbl(responses)))
    out.write(person_updates(responses))

