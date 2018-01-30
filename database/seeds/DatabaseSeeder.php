<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = app(Faker\Generator::class);

        for ($i = 0; $i < 5; $i++) {

            \App\ParentNode::create([
                'name' => $faker->word,
                'min' => rand(1, 100),
                'max' => rand(101, 9999)
            ])->generate(rand(1, 15));

        }

    }
}
