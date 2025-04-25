
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 animate-fade-in">
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-6">
              <div className="text-4xl font-bold text-ptams-blue">PTAMS</div>
            </div>
            <CardTitle className="text-2xl text-center">Mot de passe oublié</CardTitle>
            <CardDescription className="text-center">
              Entrez votre adresse email pour réinitialiser votre mot de passe
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-ptams-blue hover:bg-ptams-blue/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : "Réinitialiser le mot de passe"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-green-600">
                  Si un compte est associé à cet email, vous recevrez bientôt un email avec les instructions pour réinitialiser votre mot de passe.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              <Link to="/login" className="text-ptams-teal hover:underline">
                Retour à la connexion
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
