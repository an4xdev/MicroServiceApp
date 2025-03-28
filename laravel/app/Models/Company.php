<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Company
 * 
 * @property int $Id
 * @property string $Name
 * 
 * @property Collection|Project[] $projects
 *
 * @package App\Models
 */
class Company extends Model
{
	protected $table = 'Companies';
	protected $primaryKey = 'Id';
	public $timestamps = false;

	protected $fillable = [
		'Name'
	];

	public function projects()
	{
		return $this->hasMany(Project::class, 'CompanyId');
	}
}
