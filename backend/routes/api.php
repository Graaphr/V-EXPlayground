use App\Http\Controllers\BoothController;

Route::get('/booths',[BoothController::class,'index']);
Route::put('/booths/{id}',[BoothController::class,'update']);