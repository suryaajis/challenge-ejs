class Chef {
  constructor(id, fullName, birthDate, gender, city) {
    this.id = Number(id)
    this.fullName = fullName
    this.birthDate = birthDate
    this.gender = gender
    this.city = city
  }
  get formatBirthDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return this.birthDate.toLocaleDateString('id-ID', options)
  }
}

class ChefDetailDuration extends Chef {
  constructor(id, fullName, birthDate, gender, city, averageDuration, minDuration, maxDuration) {
    super(id, fullName, birthDate, gender, city)
    this.averageDuration = averageDuration.toFixed(2)
    this.minDuration = minDuration
    this.maxDuration = maxDuration
  }
}

class Recipe {
  constructor(id, name, duration, category, totalVote) {
    this.id = Number(id)
    this.name = name
    this.duration = duration
    this.category = category
    this.totalVote = totalVote
  }
}

class RecipeDetail extends Recipe {
  constructor(id, name, duration, category, totalVote, createdDate, notes, imageUrl, ChefId, chefName) {
    super(id, name, duration, category, totalVote)
    this.createdDate = createdDate
    this.notes = notes
    this.imageUrl = imageUrl
    this.ChefId = ChefId
    this.chefName = chefName
  }
  get formatCreatedDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return this.createdDate.toLocaleDateString("id-ID", options)
  }
  get formatDate() {
    let date = new Date(this.createdDate)
    
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if( day < 10 ) {
      day = '0' + day
    }
    
    return `${year}-${month}-${day}`;
  }
}

module.exports = {Chef, ChefDetailDuration, Recipe, RecipeDetail}

