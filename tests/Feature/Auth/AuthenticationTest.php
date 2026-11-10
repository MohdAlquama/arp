<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('admin.users.index', absolute: false));
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ]);

        $this->assertGuest();
    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest();
        $response->assertRedirect('/');
    }

    public function test_authenticated_users_can_view_user_accounts(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get(route('admin.users.index'));

        $response->assertOk();
        $response->assertInertia(fn ($page) => $page
            ->component('WebPanel/Users/Index')
            ->has('users.data', 1)
            ->where('users.data.0.email', $user->email));
    }

    public function test_authenticated_users_can_create_user_accounts(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('admin.users.store'), [
            'name' => 'New Panel User',
            'email' => 'new-panel-user@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseHas('users', [
            'name' => 'New Panel User',
            'email' => 'new-panel-user@example.com',
            'is_admin' => false,
        ]);
    }

    public function test_authenticated_users_can_delete_another_user_account(): void
    {
        $actingUser = User::factory()->create();
        $userToDelete = User::factory()->create();

        $response = $this->actingAs($actingUser)->delete(route('admin.users.destroy', $userToDelete));

        $response->assertRedirect(route('admin.users.index'));
        $this->assertDatabaseMissing('users', ['id' => $userToDelete->id]);
    }

    public function test_users_cannot_delete_their_own_account_from_user_management(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->delete(route('admin.users.destroy', $user));

        $response->assertForbidden();
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }
}
