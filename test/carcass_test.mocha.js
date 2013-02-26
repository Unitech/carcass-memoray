var carcass = require('carcass');
var should = require('should');

require('../index.js');

describe('Storages / Memory:', function() {
    it('should be a function.', function() {
        carcass.storages.should.have.property('memoray');
        carcass.storages.memory.should.be.a('function');
    });

    it('should return an object.', function() {
    	carcass.storages.memoray().should.be.a('object');
    });

    describe('A storage', function() {
        var storage = carcass.storages.memoray();
        var usr = {user : 'lubeliu', age : 27};

        it('should save with an id.', function(done) {
            storage.put({
                id: 'lorem',
                attr: 'ipsum'
            }, function(err, data) {
                should.not.exist(err);
                data.should.be.a('object');
                data.should.have.property('id', 'lorem');
                data.should.not.have.property('_id');
                data.should.have.property('attr', 'ipsum');
                done();
            });
        });


        it('should save and find data', function(done){            
            storage.put(usr, function(user)  {
                storage.find({user : 'lubeliu'}, function(err, user) {
                    user.should.eql(usr);
                    done();
                });
            });
        });

        it('should remove data', function(done){
            storage.del({user : 'lubeliu'}, function(err, res) {
                storage.find({user : 'lubeliu'}, function(err, user) {
                    should.not.exist(user);
                    done();
                });
            })           
        });
    });
});