# Pisano Hackathon - Yerim Var App Backend

Cumali'nin Kod Fabrikası
- Ferihan Çabuk
- Ahmet Can Küçükkör
- Cumali Demir

# @POST /api/create-user
======
- #### parameters
{
    "name":
    "surname":
    "username":
    "password":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    user: UserModel
}


# @POST /api/signin
======
- #### parameters
{
    "username":
    "password":
}

- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    user: UserModel,
    token: string
}

# @GET /api/categories
======
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    categories: categories,
}

# @GET /api/cities
======
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    cities: cities,
}

# @GET /api/u/advertise/create
=====
- #### parameters
{
    "token":
    "title":
    "declaration":
    "end_date":
    "category":
    "budget":
}
- #### returns if(fails)
{
    success: boolean,
    message: string
}

- #### returns if(success)
{
    success: boolean,
    advertise: advertise,
}