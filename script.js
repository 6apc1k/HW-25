var persons = [
    { name: 'Bill', surname: 'Clinton', rate: '20' },
    { name: 'George', surname: 'Bush', rate: '10' },
    { name: 'Barake', surname: 'Obama', rate: '30' },
    { name: 'Abraham', surname: 'Linkoln', rate: '25' }
];

var President = Backbone.Model.extend({
    defaults: {
        name: 'John',
        surname: '',
        rate: 0
    },
    validate: function (attributes) {
        if (!attributes.surname || !attributes.name) {
            return 'cannot be empty';
        }
    }
});

var PresidentsCollection = Backbone.Collection.extend({
    model: President
});

var presidentsCollection = new PresidentsCollection(persons);

presidentsCollection.comparator = function (model) {
    return model.get('rate');
};

presidentsCollection.sort();

var ItemView = Backbone.View.extend({
    tagName: 'tr',
    className: 'item',
    render: function () {

        this.$el.html(`<td>${this.model.get('name')}</td>
                   <td>${this.model.get('surname')}</td>
                   <td>${this.model.get('rate')}</td>`);
        return this
    },

    initialize: function (args) {
        args.model.on('change', () => {
            this.render();
        });
    },
});


var ListView = Backbone.View.extend({
    tagName: 'tbody',
    render: function () {

        this.$el.html(`<tr>
                      <td>Name</td>
                      <td>Surname</td>
                      <td>Rating</td>
                   </tr>`);

        this.model.each((el) => {
            let president = new ItemView({
                model: el
            })
            this.$el.append(president.render().$el);
        }
    
    );
        return this;
    }
});

let view = new ListView({
    model: presidentsCollection
});

$('table').html(view.render().$el);

var AddFormView = Backbone.View.extend({
    el: $('#form'),
    initialize: function (persons) {

        $('#add').click(function () {
            let newP = {
                name: $('#name').val(),
                surname: $('#surname').val(),
                rating: 0
            }
            persons.model.push(new President(newP));
            persons.render();
        });
      }
    });

let form = new AddFormView(view);



