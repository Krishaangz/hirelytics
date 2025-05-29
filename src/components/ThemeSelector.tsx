
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { Palette, Check } from 'lucide-react';

const ThemeSelector = () => {
  const { user, updatePreferences } = useAuthStore();

  const colorPalettes = [
    { 
      id: 'default', 
      name: 'Ocean Blue', 
      colors: ['#ADD8E6', '#001F3F', '#1BFFFF'],
      description: 'Cool ocean-inspired blues'
    },
    { 
      id: 'purple', 
      name: 'Royal Purple', 
      colors: ['#DDA0DD', '#4B0082', '#9370DB'],
      description: 'Elegant purple tones'
    },
    { 
      id: 'green', 
      name: 'Forest Green', 
      colors: ['#90EE90', '#006400', '#32CD32'],
      description: 'Natural green palette'
    },
    { 
      id: 'orange', 
      name: 'Sunset Orange', 
      colors: ['#FFE4B5', '#FF8C00', '#FF6347'],
      description: 'Warm sunset colors'
    },
    { 
      id: 'red', 
      name: 'Crimson Red', 
      colors: ['#FFB6C1', '#8B0000', '#DC143C'],
      description: 'Bold red accents'
    }
  ];

  const handlePaletteChange = (paletteId: string) => {
    updatePreferences({ colorPalette: paletteId as any });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Palette className="w-5 h-5" />
          <span>Color Palette</span>
        </CardTitle>
        <CardDescription>Choose your preferred color scheme</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colorPalettes.map((palette) => (
            <div
              key={palette.id}
              className={`relative p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                user?.preferences.colorPalette === palette.id 
                  ? 'ring-2 ring-primary bg-accent' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => handlePaletteChange(palette.id)}
            >
              {user?.preferences.colorPalette === palette.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4 text-primary" />
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex space-x-2">
                  {palette.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <div>
                  <h4 className="font-medium">{palette.name}</h4>
                  <p className="text-sm text-muted-foreground">{palette.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
