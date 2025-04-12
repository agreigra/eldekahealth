
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';
import { useLoginMutation } from '@/services/authenticationApi';
import { setToken } from '@/util/tokenUtil';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [error, setError] = useState('');

  const [login, { isLoading, isSuccess, error: loginError, data }] = useLoginMutation();

  const from = location.state?.from?.pathname || '/';

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: 'Success',
        description: 'You have been successfully logged in.',
      });
      navigate(from, { replace: true });
    }
    if (loginError) {
      const errorMessage = 'error' in loginError ? 
        (loginError.error as string) : 
        'Invalid email or password. Please try again.';
      setError(errorMessage);
    }
  }, [isSuccess, data, loginError, toast, navigate, from]);

  const onSubmit = async (data: FormData) => {
    setError('');
    // Ensure email and password are not undefined
    const { email, password } = data;
    try {
      const response = await login({ email, password }).unwrap();
      setToken(response.token)
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // For demo purposes, add demo credentials
  const demoCredentials = [
    { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
    { email: 'visitor@example.com', password: 'visitor123', role: 'Visitor' }
  ];

  return (
    <div>
      <PageHeader
        title="Login"
        description="Sign in to your account"
      />
      <div className="container max-w-md mx-auto py-12">
        <div className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-medical-600 hover:bg-medical-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
              
              <div className="text-sm text-center mt-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-medical-600 hover:text-medical-700 font-medium">
                  Register here
                </Link>
              </div>
            </form>
          </Form>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-center font-semibold mb-4">Demo Accounts</h3>
            <div className="grid gap-4">
              {demoCredentials.map((cred, idx) => (
                <div key={idx} className="border rounded p-3 text-sm">
                  <div><strong>Role:</strong> {cred.role}</div>
                  <div><strong>Email:</strong> {cred.email}</div>
                  <div><strong>Password:</strong> {cred.password}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
