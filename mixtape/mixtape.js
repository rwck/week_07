// var callback = function() {
//   alert("button was clicked")
// }
// $('button').on('click', callback);

//
// We actually want mixtape to be a global vari

// This is creating a new JSON model

var mixtape = mixtape || {};

mixtape.Song = Backbone.Model.extend({
  //stuff in here
  defaults: {
    name: "Piano Man",
    artist: "Billy Joel"
  },

  initialize: function() {
    this.on("all", function(event) {
      console.log(event);
    });
    this.on("change:artist", function(model) {
      console.log("Song now written by " + model.get("artist"));
    });
  }
});

// var poison = new mixtape.Song({name: "Poison", artist: "Alice Cooper"});
//
// var song = new mixtape.Song();
//
// console.log(poison);
// console.log(song);

mixtape.SongView = Backbone.View.extend({
  // fetch our song template out of the HTML and prepare it for use

  template: _.template($("#song-template").html()),

  events: {
    "click .save-song": "onSave",
    "click .viewing": "onEdit",
  },

  initialize: function () {
    this.listenTo(this.model, "change", this.render)
  },


  // backbone will call this when it need to 'redraw' the song
  render: function() {
    // render the song template using the data from the model
    var templateResult = this.template(this.model.attributes);
    // put the result into the HTML DOM
    // el is a thing provided by backbone

    this.$el.html(templateResult)
  },

  onSave: function(clickEvent) {
    alert("Model Saving");
    // this.model.set
    // var name = $(".name-input")
    // the dollar below is from backbone
    var newName = this.$(".name-input").val();
    var newArtist = this.$(".artist-input").val();
    this.model.set({name: newName, artist: newArtist});

    this.$el.removeClass("mode-editing");
  },

  onEdit: function() {
    console.log("onEdit");
    // $(".song")fadeOut("slow");
    this.$el.addClass("mode-editing");
    // this.$(".name-input").focus();
  }

});




$(document).ready(function(){
  var song = new mixtape.Song({
    name: "Poison",
    artist: "Alice Cooper"
  });

  var songView = new mixtape.SongView({
    model: song,
    el: $(".song")
  });

  // var songView2 = new mixtape.SongView({
  //   model: song,
  //   el: $(".song2")
  // });

  var song

  songView.render();

});
