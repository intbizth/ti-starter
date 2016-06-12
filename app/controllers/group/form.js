var Base = require('controller');

function onSaveClick(e) {
    //Base.applyModelData($model, $, ['name']);
    $model.set('name', $.name.value);

    $model.isValid().then(function(result) {
        console.log(result);
        if (result.valid) {
            $model.save(null, {
                //wait: true, is new wait to apply server response data
                patch: true,
                success: function () {
                    console.log('Success!');
                }
            });

            return;
        }
    });
}

$model.on('change:name', function(rec) {
    console.log(rec.get('name'))
});

$.form.addEventListener('close', function () {
    console.log('Group Form Closed');
    $.destroy();
});
